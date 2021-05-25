"""
A Stave server script for admin to import/export project from/to
a directory. Expected directory structure:

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


def usage():
    print("""
    Commands
        import                  - Import project from directory
        export                  - Export project to directory

    Common args:
        --help | -h             - Show usage
        --open | -o             - Open browser
        --project-path | -p     - Project path for import/export
        --project-id | -i       - Project database id to export

    Import Project:
        import -p <project_path> [-o]

    Export Project:
        export -p <project_path> -i <project_id> [-o]

""")
    sys.exit()


def main(args):

    if len(args) < 2:
        usage()
    
    command = args[1]
    if command not in ("import", "export"):
        usage()

    try:
        opts, args = getopt.getopt(args[2:], 
            "hop:i:", ["help", "open", "project-path=", "project-id="])
        project_path = None
        project_id = None
        do_open = False
        for option, value in opts:
            if option in ("-h", "--help"):
                usage()
            elif option in ("-p", "--project-path"):
                project_path = value
            elif option in ("-i", "--project-id"):
                project_id = int(value)
            elif option in ("-o", "--open"):
                do_open = True
    except Exception as e:
        print(e)
        usage()

    if project_path is None or (command == "export" and project_id is None):
        usage()
    
    sv = StaveViewer(
        thread_daemon=not do_open,
        in_viewer_mode=False
    )
    sv.run()

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
            return

        # Post a request to django to import/export project
        post_url = f"{sv.url}/api/projects/" + (
            f"{project_id}/export" if command == "export" else "import")
        response = session.post(post_url, json={"project_path": project_path})
        if response.status_code != 200:
            print(f"[ERROR]: Failed to {command} project.")
            return

        if do_open:
            sv.open()

        print("Done")

if __name__ == "__main__":
    main(sys.argv)