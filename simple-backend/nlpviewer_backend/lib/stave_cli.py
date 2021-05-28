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
import getopt
import getpass
import requests
from nlpviewer_backend.lib.stave_viewer import StaveViewer

START = "start"
LOAD = "load"
IMPORT = "import"
EXPORT = "export"

def usage():
    print(f"""
    Commands
        {START}                 - Start the Stave server
        {LOAD}                  - Create database and load data
        {IMPORT}                - Import project from directory
        {EXPORT}                - Export project to directory

    Common args:
        --help | -h             - Show usage
        --open | -o             - Open browser
        --project-path | -p     - Project path for import/export
        --project-id | -i       - Project database id to export
        --load-auth | -a        - Load default user and permission info
        --load-samples | -s     - Load sample projects into database

    Start Stave Server:
        stave {START} [-p <project_path>] [-o]

    Create Database:
        stave {LOAD} [-a] [-s] [-o]

    Import Project:
        stave {IMPORT} -p <project_path> [-o]

    Export Project:
        stave {EXPORT} -p <project_path> -i <project_id> [-o]

""")
    sys.exit()


def main():
    
    if len(sys.argv) < 2:
        usage()
    
    command = sys.argv[1]
    if command not in (START, LOAD, IMPORT, EXPORT):
        usage()

    try:
        opts, args = getopt.getopt(sys.argv[2:],
            "hoasp:i:",
            ["help", "open", "load-auth", "load-samples",
            "project-path=", "project-id="]
        )
    except Exception as e:
        print(e)
        usage()

    project_path = None
    project_id = None
    do_open = False
    load_auth = False
    load_samples = False
    for option, value in opts:
        if option in ("-h", "--help"):
            usage()
        elif option in ("-p", "--project-path"):
            project_path = value
        elif option in ("-i", "--project-id"):
            project_id = int(value)
        elif option in ("-o", "--open"):
            do_open = True
        elif option in ("-a", "--load-auth"):
            load_auth = True
        elif option in ("-s", "--load-samples"):
            load_samples = True  

    if (command in (IMPORT, EXPORT) and project_path is None) or \
    (command == EXPORT and project_id is None):
        usage()
    
    in_viewer_mode = (project_path is not None) and (command == START)
    sv = StaveViewer(
        project_path=project_path if in_viewer_mode else '',
        thread_daemon=not (command == START or do_open),
        in_viewer_mode=in_viewer_mode
    )
    sv.run()

    if command == LOAD:
        StaveViewer.load_database(
            load_auth=load_auth,
            load_samples=load_samples
        )
    elif command in (IMPORT, EXPORT):
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
                f"{project_id}/export" if command == EXPORT else "import")
            response = session.post(
                post_url, json={"project_path": project_path})
            if response.status_code != 200:
                print(f"[ERROR]: Failed to {command} project.")
                sys.exit()

    if do_open:
        sv.open()

    print("Done")

if __name__ == "__main__":
    main()