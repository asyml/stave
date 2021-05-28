"""
StaveViewer provides an interface to start Stave in viewer mode, which bypasses
django backend APIs and databases to render visualization by rerouting data
source to local disk storage system. This eliminates the need for users to
worry about username, password, credentials, and permissions, so that it is
simple and straightforward for users to boot up Stave for easy-visualization.

Package Requirements:
    tornado == 6.1
    django == 3.2
"""

import os
import json
import errno
import sqlite3
import logging
import asyncio
import threading
import webbrowser
from typing import Dict, Set, Any, List

import django
from django.core.management import call_command
from django.core.wsgi import get_wsgi_application

from tornado.web import FallbackHandler, StaticFileHandler, \
    RequestHandler, RedirectHandler, url, Application
from tornado.httpserver import HTTPServer
from tornado.ioloop import IOLoop
from tornado.wsgi import WSGIContainer

from .stave_project import StaveProjectReader

logger = logging.getLogger(__name__)

__all__ = [
    "StaveViewer"
]


class StaveViewer:
    """
    StaveViewer allows users to start and control a Stave instance in viewer
    mode. Example usage:

        sv = StaveViewer(project_path = project_path)
        sv.run()
        sv.open()

    The codes above initialize a StaveViewer instance by passing the Stave
    build path(deprecated in future update) and project path. By calling
    `run()`, StaveViewer starts a tornado server on a newly created thread.
    `open()` method will open the browser with the visualization.
    
    Note: Currently the viewer mode is achieved by rerouting the django
    backend requests and it can be hard to maintain when structure changes
    in Stave. Refactoring is welcome to improve code logic and maintanence.
    """

    def __init__(self,
        project_path: str = '',
        host: str = "localhost",
        port: int = 8888,
        thread_daemon: bool = False,
        in_viewer_mode: bool = True
    ):
        """
        Initialize StaveViewer with input paramaters.

        Args:
            project_path: Path to the project directory for rendering.
                Default to the current path ''.
            host: host name for Stave server. Default value is `localhost`.
            port: port number for Stave server. Default value is 8888.
            thread_daemon: Set whether the thread is daemonic.
                Default to False.
            in_viewer_mode: Enable viewer mode of Stave. If False, StaveViewer
                will start a standard Stave instance. Default to True.
        """
        self._project_reader: StaveProjectReader

        self._project_path: str = project_path
        self._build_path: str = os.path.join(
            os.path.dirname(os.path.abspath(__file__)), "build")
        
        self._host: str = host
        self._port: int = port
        self._thread_daemon: bool = thread_daemon
        
        self.url: str = f"http://{host}:{port}"
        self.server_started: bool = False
        self.in_viewer_mode: bool = in_viewer_mode

        # Used for sync between threads
        self._barrier = threading.Barrier(2, timeout=1)

    class ViewerHandler(RequestHandler):
        """
        Handler of Stave viewer requests.
        Override django backend APIs to deal with requests from Stave Viewer.
        """

        def __init__(self, *args, **kwargs):
            super().__init__(*args, **kwargs)
            self._project_reader: StaveProjectReader

        def initialize(self, project_reader: StaveProjectReader):
            self._project_reader = project_reader

        def set_default_headers(self):
            self.set_header("Content-Type", 'application/json')

    class PackOntoHandler(ViewerHandler):
        """
        Handler of requests `/api/ontology_from_doc/:id`.
        Respond with a json object storing textPack and ontology.
        """

        def get(self, doc_id: str):
            ontology = json.dumps(self._project_reader.ontology)
            textpack = json.dumps(
                        self._project_reader.get_textpack(int(doc_id)))
            self.write({
                "id": doc_id,
                "textPack": textpack,
                "ontology": ontology
            })

    class ConfigHandler(ViewerHandler):
        """
        Handler of requests `/api/config_from_doc/:id`.
        Respond with a json object storing project configuration.
        """

        def get(self, doc_id: str):
            self.write({
                "id": doc_id,
                "config": json.dumps(self._project_reader.project_configs)
            })

    class NextDocHandler(ViewerHandler):
        """
        Handler of requests `/api/next_doc/:id`.
        Respond with a json object storing next document's id.
        """

        def get(self, doc_id: str):
            self.write({
                "id": self._project_reader.get_next_index(int(doc_id))
            })

    class PrevDocHandler(ViewerHandler):
        """
        Handler of requests `/api/prev_doc/:id`.
        Respond with a json object storing previous document's id.
        """

        def get(self, doc_id: str):
            self.write({
                "id": self._project_reader.get_prev_index(int(doc_id))
            })

    class NonImplementHandler(ViewerHandler):
        """
        Handler of requests related to all the other django APIs.
        Since editing in viewer mode is currently not allowed, these requests
        will trigger an HTTP error (403 Forbidden).

        TODO: In future update, if viewer mode editing is required,
            these requests can be handled by reading/writing corresponding
            textpack files.
        """

        def get(self):
            self.send_error(403)

        def post(self):
            self.send_error(403)

    class ProxyHandler(FallbackHandler):
        """
        URL routing for django web interface.
        ProxyHandler directs all requests with `/api`-prefixed url to
        the django wsgi application.
        """

        def initialize(self, fallback):
            # Strip prefix "/api" from uri and path
            # TODO: May look for more standard implementation in future.
            self.request.uri = self.request.uri[4:]
            self.request.path = self.request.path[4:]
            super().initialize(fallback)

    class ReactHandler(RequestHandler):
        """
        Handler of requests to React index page.
        ReactHandler makes sure all requests fall back to index page
        so that they can follow the standard React routing rules.
        """

        def __init__(self, *args, **kwargs):
            super().__init__(*args, **kwargs)
            self._build_path: str

        def initialize(self, build_path):
            self._build_path = build_path

        def get(self):
            self.render(self._build_path + "/index.html")

    def run(self):
        """
        Create a new thread and start the Stave server.
        """
        if self.server_started:
            return
        
        if self.in_viewer_mode:
            self._project_reader = StaveProjectReader(
                project_path=self._project_path
            )

        # Start a new thread to server Stave
        thread = threading.Thread(
            target=self._start_server,
            daemon=self._thread_daemon
        )
        thread.start()

        # Wait for server to boot up
        self._barrier.wait()
        if not thread.is_alive():
            raise Exception("Stave server not started.")

        # Initialize database for full mode Stave
        if not self.in_viewer_mode:
            self.load_database()
        self.server_started = True

    def open(self, url=None):
        """
        Open browser for visualization.

        Args:
            url: Web browser will open the webpage directed by input url.
                Default to None, which allows StaveViewer to automatically
                set the url based on `in_viewer_mode`.
        """
        webbrowser.open(url or (
            f"{self.url}/viewer/0" if \
            self.in_viewer_mode else self.url
        ))

    def _start_server(self):
        asyncio.set_event_loop(asyncio.new_event_loop())
        if not self.in_viewer_mode:
            os.environ['DJANGO_SETTINGS_MODULE'] = "nlpviewer_backend.settings"
            os.environ["DJANGO_ALLOW_ASYNC_UNSAFE"] = "true"
            django.setup()

        server = HTTPServer(self._get_application())
        server.listen(self._port)

        # Release lock in main thread
        self._barrier.wait()

        IOLoop.current().start()

    def _get_application(self):

        # TODO: Find better logic to deal with routing.
        #       The following implementation may miss some corner cases.
        base_list = [
            url(r'.*/([^/]*\.png)', StaticFileHandler, {
                "path": self._build_path
            }),
            url(r'.*/([^/]*\.ico)', StaticFileHandler, {
                "path": self._build_path
            }),
            url(r"/.*", self.ReactHandler, {
                "build_path": self._build_path
            })
        ]

        if self.in_viewer_mode:
            handler_args = {"project_reader": self._project_reader}
            router_list = [
                url(r"/api/ontology_from_doc/(.*)",
                    self.PackOntoHandler, handler_args),
                url(r"/api/config_from_doc/(.*)",
                    self.ConfigHandler, handler_args),
                url(r"/api/next_doc/(.*)",
                    self.NextDocHandler, handler_args),
                url(r"/api/prev_doc/(.*)",
                    self.PrevDocHandler, handler_args),
                url(r"/api/.*",
                    self.NonImplementHandler, handler_args),
                url(r'.*/static/(.*)', StaticFileHandler, {
                    "path": self._build_path + "/static/"
                }),
                url(r"/documents/(\d+)",
                    RedirectHandler, {"url": "/viewer/{0}"})
            ]
        else:
            wsgi_app = WSGIContainer(get_wsgi_application())
            router_list = [
                url(r"/api/(.*)", self.ProxyHandler, dict(fallback=wsgi_app)),
                url(r'.*/static/(.*)', StaticFileHandler, {
                    "path": self._build_path + "/static/"
                }),
            ]

        return Application(router_list + base_list)

    @classmethod
    def load_database(cls, 
        load_auth: bool = False,
        load_samples: bool = False
    ):
        """
        Initialize sqlite database for django backend.

        Args:
            load_auth: Insert default user and authentication info to database.
                Default to False.
            load_samples: Indicate whether to load sample projects
                into database. Deafult to False.
        """
        dir_path = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
        db_file = os.path.join(dir_path, "db.sqlite3")
        if not os.path.exists(db_file):
            call_command("migrate")

        sql_files = []
        if load_auth:
            sql_files.extend([
                "auth_user.sql",
                "guardian_userobjectpermission.sql"
            ])
        if load_samples:
            sql_files.extend([
                "nlpviewer_backend_project.sql",
                "nlpviewer_backend_document.sql"
            ])
        if not sql_files:
            return

        conn = sqlite3.connect(db_file)
        cur = conn.cursor()
        try:
            for sql_file in sql_files:
                with open(
                    os.path.join(dir_path, f"sample_sql/{sql_file}"
                ), 'r') as f:
                    cur.executescript(f.read())
            conn.commit()
        except sqlite3.IntegrityError as err:
            logger.info("Cannot insert duplicate entries: %s", err)
        finally:
            conn.close()
