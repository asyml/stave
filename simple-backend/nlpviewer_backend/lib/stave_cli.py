"""
A Stave command line interface for users to start running Stave, to initialize
database for django backend, and to import/export project from/to a directory.
Expected directory structure:

    - project_path/
            - PROJECT_META_FILE
            - *.0.json
            - *.1.json
            - *.2.json
            ...

"""

import os
import sys
import json
import argparse
import getpass
import logging
from nlpviewer_backend.lib.stave_viewer import StaveViewer
from nlpviewer_backend.lib.stave_session import StaveSession

START = "start"
LOAD = "load"
IMPORT = "import"
EXPORT = "export"
CONFIG = "config"

def get_args():

    parser = argparse.ArgumentParser(
        description="A Stave command line interface for users to start "
            "running Stave, to initialize database for django backend, "
            "and to import/export project from/to a directory."
    )
    parser.add_argument("-o", "--open", action="store_true",
                                help="Open browser")
    parser.add_argument("-v", "--verbose", action="store_true",
                                help="Increase output verbosity")
    parser.add_argument("-p", "--port", type=int, default=8888,
                                help="The port number that server listens to")
    subparsers = parser.add_subparsers(dest="command",
                                help="Valid commands")
    subparsers.required=True
    
    parser_start = subparsers.add_parser(START, 
                                help="Start the Stave server")
    parser_start.add_argument("-p", "--project-path",
                                help="Project path for viewer mode")

    parser_load = subparsers.add_parser(LOAD,
                                help="Create database and load data")
    parser_load.add_argument("-s", "--load-samples", action="store_true",
                                help="Load sample projects into database")

    parser_import = subparsers.add_parser(IMPORT,
                                help="Import project from directory")
    parser_import.add_argument("project_path", metavar="project-path",
                                help="Project path for import")

    parser_export = subparsers.add_parser(EXPORT,
                                help="Export project to directory")
    parser_export.add_argument("project_path", metavar="project-path",
                                help="Project path for export")
    parser_export.add_argument("project_id", type=int, metavar="project-id",
                                help="Database id of project")

    parser_config = subparsers.add_parser(CONFIG,
                                help="Change Stave configuration")
    parser_config.add_argument("-s", "--show-config", action="store_true",
                                help="Display config info")
    parser_config.add_argument("-d", "--db-file",
                                help="Path to database file of Stave")
    parser_config.add_argument("-l", "--log-file",
                                help="Path to log file for logging")

    return parser.parse_args()

def set_logger(verbose: bool, log_file: str):
    """
    Set up logging. The implementation is contingent on the LOGGING field
    in "nlpviewer_backend/settings.py", so this can only be called after
    the server starts.
    """
    root_logger = logging.getLogger()
    root_logger.setLevel(logging.NOTSET)

    stream_handler = root_logger.handlers[0]
    stream_handler.setLevel(logging.INFO if verbose else logging.ERROR)

    file_handler = logging.FileHandler(log_file)
    file_handler.setLevel(logging.NOTSET)
    file_handler.setFormatter(stream_handler.formatter)

    root_logger.addHandler(file_handler)
    logging.getLogger("django").addHandler(file_handler)

    return root_logger

def main():
    
    args = get_args()
    in_viewer_mode = args.command == START and args.project_path is not None
    thread_daemon = not (args.command == START or args.open)

    if args.command == CONFIG:
        if args.show_config:
            print(json.dumps(
                StaveViewer.load_config(),
                sort_keys=True,
                indent=4
            ))
        else:
            StaveViewer.set_config(
                db_file=args.db_file and os.path.abspath(args.db_file),
                log_file=args.log_file and os.path.abspath(args.log_file)
            )
        sys.exit()

    sv = StaveViewer(
        project_path=args.project_path if in_viewer_mode else '',
        port=args.port,
        thread_daemon=thread_daemon,
        in_viewer_mode=in_viewer_mode
    )
    sv.run()

    logger = set_logger(verbose=args.verbose, log_file=sv.log_file)

    try:
        if args.command == LOAD:
            sv.load_database(load_samples=args.load_samples)
            logger.info("Successfully initialize database.")
        elif args.command in (IMPORT, EXPORT):
            with StaveSession(url=sv.url) as session:
                # Login with input username and password
                session.login(
                    username=input("Username: "),
                    password=getpass.getpass("Password: ")
                )
                # Post a request to django to import/export project
                if args.command == IMPORT:
                    session.import_project(args.project_path)
                    logger.info("Successfully import project from %s.",
                                    args.project_path)
                elif args.command == EXPORT:
                    session.export_project(args.project_path, args.project_id)
                    logger.info("Successfully export project[%d] to %s.",
                                    args.project_id, args.project_path)
        if args.open:
            sv.open()
    except Exception:
        sys.exit()
    finally:
        print(f"For more details, check out log file at {sv.log_file}.")
        # If the thread is not daemonic, user need to force stop the server
        if not thread_daemon:
            print(f"Starting Stave server at {sv.default_page}.\n"
                    "Quit the server with CONTROL-C.")
        print()

if __name__ == "__main__":
    main()
