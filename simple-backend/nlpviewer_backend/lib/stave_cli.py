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
import argparse
import getpass
import requests
from nlpviewer_backend.lib.stave_viewer import StaveViewer

START = "start"
LOAD = "load"
IMPORT = "import"
EXPORT = "export"


def main():

    parser = argparse.ArgumentParser(
        description="A Stave command line interface for users to start "
            "running Stave, to initialize database for django backend, "
            "and to import/export project from/to a directory."
    )
    parser.add_argument("-o", "--open", action="store_true",
                                help="Open browser")
    subparsers = parser.add_subparsers(required=True, dest="command",
                                help="Valid commands")
    
    parser_start = subparsers.add_parser(START, 
                                help="Start the Stave server")
    parser_start.add_argument("-p", "--project-path",
                                help="Project path for viewer mode")

    parser_load = subparsers.add_parser(LOAD,
                                help="Create database and load data")
    parser_load.add_argument("-a", "--load-auth", action="store_true",
                                help="Load default user and permission info")
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

    args = parser.parse_args()

    in_viewer_mode = args.command == START and args.project_path is not None
    sv = StaveViewer(
        project_path=args.project_path if in_viewer_mode else '',
        thread_daemon=not (args.command == START or args.open),
        in_viewer_mode=in_viewer_mode
    )
    sv.run()

    if args.command == LOAD:
        StaveViewer.load_database(
            load_auth=args.load_auth,
            load_samples=args.load_samples
        )
    elif args.command in (IMPORT, EXPORT):
        with requests.Session() as session:
            # Login with input username and password
            username = input("Username: ")
            response = session.post(f"{sv.url}/api/login",
                json={
                    "name": username,
                    "password": getpass.getpass("Password: ")
                })
            if response.status_code != 200:
                print("[ERROR]: Login fail.")
                sys.exit()

            # Post a request to django to import/export project
            post_url = f"{sv.url}/api/projects/" + (
                f"{args.project_id}/export" if args.command == EXPORT \
                else "import")
            response = session.post(
                post_url, json={"project_path": args.project_path})
            if response.status_code != 200:
                print(f"[ERROR]: Failed to {args.command} project.")
                sys.exit()

    if args.open:
        sv.open()

    print("Done")

if __name__ == "__main__":
    main()
