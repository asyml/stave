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

import sys
import argparse
import getpass
import logging
from typing import List, Union
from stave_backend.lib.stave_viewer import StaveViewer
from stave_backend.lib.stave_session import StaveSession
from stave_backend.lib.stave_config import StaveConfig

START = "start"
LOAD = "load-samples"
IMPORT = "import"
EXPORT = "export"
CONFIG = "config"

CONFIG_ARGS = {
    "django_settings_module": {
        "name_or_flags": ["-s", "--django-settings-module"],
        "kwargs": {"help": (
            "Module path to settings.py of django project. "
            "If you have not set up any django project, you should leave this "
            "field empty and stave will use its default configuration. "
            "To set this field you should already have a django project and "
            "the 'settings.py' file under your project must be accessible "
            "from PYTHONPATH so that django can import it as a module. "
            "Example: 'myproject.settings'"
        )},
    },
    "db_file": {
        "name_or_flags": ["-d", "--db-file"],
        "kwargs": {"help": "Path to database file of Stave"}
    },
    "log_file": {
        "name_or_flags": ["-l", "--log-file"],
        "kwargs": {"help": "Path to log file for logging"}
    },
    "allowed_hosts": {
        "name_or_flags": ["-a", "--allowed-hosts"],
        "kwargs": {
            "default": ["localhost"],
            "nargs": '+',
            "help": (
                "A list of strings representing the host/domain names that "
                "stave can serve."
            )
        }
    }
}

def get_args():

    parser = argparse.ArgumentParser(
        description="A Stave command line interface for users to start "
            "running Stave, to initialize database for django backend, "
            "and to import/export project from/to a directory."
    )
    parser.add_argument("-v", "--verbose", action="store_true",
                                help="Increase output verbosity")
    parser.add_argument("-s", "--simple", action="store_true", 
                                help=("Simple mode without initial setup step."
                                " Stave will use the default configuration."))
    subparsers = parser.add_subparsers(dest="command",
                                help="Valid commands")
    subparsers.required=True
    
    parser_start = subparsers.add_parser(START, 
                                help="Start the Stave server")
    parser_start.add_argument("-p", "--project-path",
                                help="Project path for viewer mode")
    parser_start.add_argument("-o", "--open", action="store_true",
                                help="Open browser")
    parser_start.add_argument("-n", "--port-number", type=int, default=8888,
                                help="The port number that server listens to")
    parser_start.add_argument("-l", "--load-samples", action="store_true",
                                help="Load sample projects into database")

    parser_load = subparsers.add_parser(LOAD,
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
                                help="Show or change Stave configuration")
    parser_config.add_argument("-i", "--interact-config", action="store_true",
                                help="Interactively set up the configuration")
    for opt in CONFIG_ARGS.values():
        parser_config.add_argument(*opt["name_or_flags"], **opt["kwargs"])

    return parser.parse_args()

def set_logger_verbose(verbose: bool):
    """
    Set up logging verbose at runtime. The implementation is contingent on
    static LOGGING setting in "stave_config.py". This can only be called after
    the server starts.
    """
    root_logger = logging.getLogger()

    root_handlers = root_logger.handlers
    if root_handlers and isinstance(root_handlers[0], logging.StreamHandler):
        root_handlers[0].setLevel(logging.INFO if verbose else logging.ERROR)
    else:
        root_logger.setLevel(logging.INFO if verbose else logging.ERROR)

    return root_logger

def interactive_config(config: StaveConfig):
    """
    Interactively set up the configuration
    """
    print(config.README)
    def set_val(name: str):
        """
        Set attribute value based on user input
        """
        val: Union[str, List] = input(
            f"\nname: {name}\n"
            f"default/current: {getattr(config, name)}\n"
            f"description: {CONFIG_ARGS[name]['kwargs']['help']}\n"
            f"Enter the config below or press ENTER to accept the "
            "default/current setting: \n> "
        )
        if val:
            if val in ("None", "null"):
                val = None
            if val in ("''", '""'):
                val = ""
            setattr(config, name, val)
        return val

    dsm_name: str = "django_settings_module"
    if not set_val(dsm_name):
        for name in CONFIG_ARGS.keys():
            if name == dsm_name:
                continue
            set_val(name)
    config.show_config()

def main():
    
    args = get_args()
    config = StaveConfig()
    in_viewer_mode = args.command == START and args.project_path is not None
    thread_daemon = not (args.command == START)

    if args.command == CONFIG:
        if args.interact_config:
            interactive_config(config=config)
        else:
            for field in CONFIG_ARGS.keys():
                if getattr(args, field) is not None:
                    setattr(config, field, getattr(args, field))
            config.show_config()
        sys.exit()

    # Interactively set up the configuration
    if not config.is_initialized() and not args.simple:
        interactive_config(config=config)

    sv = StaveViewer(
        project_path=args.project_path if in_viewer_mode else '',
        port=args.port_number if args.command == START else 8888,
        thread_daemon=thread_daemon,
        in_viewer_mode=in_viewer_mode
    )
    sv.run()

    logger = set_logger_verbose(verbose=args.verbose)

    try:
        if args.command == START:
            if args.load_samples:
                sv.load_database(load_samples=True)
                logger.info("Successfully load sample projects.")
            if args.open:
                sv.open()
        elif args.command == LOAD:
            sv.load_database(load_samples=True)
            logger.info("Successfully load sample projects.")
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
    except Exception:
        sys.exit()
    finally:
        # log_file only available when django_settings_module is not set
        if not config.django_settings_module:
            print(f"For more details, check out log file at {config.log_file}.")
        # If the thread is not daemonic, user need to force stop the server
        if not thread_daemon:
            print(f"Starting Stave server at {sv.default_page}.\n"
                    "Quit the server with CONTROL-C.")
        print()

if __name__ == "__main__":
    main()
