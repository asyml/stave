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
        "help": "Module path to settings.py of django project"
    },
    "db_file": {
        "name_or_flags": ["-d", "--db-file"],
        "help": "Path to database file of Stave"
    },
    "log_file": {
        "name_or_flags": ["-l", "--log-file"],
        "help": "Path to log file for logging"
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
    for opt in CONFIG_ARGS.values():
        parser_config.add_argument(*opt["name_or_flags"], help=opt["help"])

    return parser.parse_args()

def set_logger_verbose(verbose: bool):
    """
    Set up logging. The implementation is contingent on the LOGGING field
    in "stave_backend/settings.py", so this can only be called after
    the server starts.
    """
    root_logger = logging.getLogger()

    root_handlers = root_logger.handlers
    if root_handlers and isinstance(root_handlers[0], logging.StreamHandler):
        root_handlers[0].setLevel(logging.INFO if verbose else logging.ERROR)
    else:
        root_logger.setLevel(logging.NOTSET if verbose else logging.ERROR)

    return root_logger

def main():
    
    args = get_args()
    config = StaveConfig()
    in_viewer_mode = args.command == START and args.project_path is not None
    thread_daemon = not (args.command == START)

    if args.command == CONFIG:
        for field in CONFIG_ARGS.keys():
            if getattr(args, field) is not None:
                setattr(config, field, getattr(args, field))
        config.show_config()
        sys.exit()

    if not config.is_initialized():
        print(
            "\nInitialize Stave configuraion\nEnter the entry for each "
            "prompt below.\nYou may leave empty to accept the default value."
            "\nNote: If you set the 'django_settings_module' field, the "
            "other configs (e.g., 'db_file', 'log_file') will be ignored."
        )
        for name, opt in CONFIG_ARGS.items():
            val: str = input(
                f"\n<argument name: {name}>\n<description: {opt['help']}>\n"
                f"<default: {getattr(config, name)}>\n> "
            )
            if val:
                setattr(config, name, val)
        config.show_config()

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
        print(f"For more details, check out log file at {config.log_file}.")
        # If the thread is not daemonic, user need to force stop the server
        if not thread_daemon:
            print(f"Starting Stave server at {sv.default_page}.\n"
                    "Quit the server with CONTROL-C.")
        print()

if __name__ == "__main__":
    main()
