"""
This module supports interactions with Stave backend database by
calling django web APIs. Operations include login, create/import/export
project, etc.
"""


import logging
import requests

logger = logging.getLogger(__name__)

__all__ = [
    "StaveSession"
]


class StaveSession(requests.Session):
    """
    A context manager that maintains a connection session with Stave backend.
    Example usage:
        with StaveSession(url="http://localhost:8888") as session:
            session.login(
                username="your_username",
                password="your_password"
            )
            project_list = session.get_project_list().json()
            print(project_list)
    """
    def __init__(self, url: str, suppress_err: bool = False):
        """
        Args:
            url: The webpage that django server is running on.
            suppress_err: A boolean indicates whether to prevent excetion
                caught within the context manager from being propagated. Default
                to False.
        """
        self._url: str = url
        self._suppress: bool = suppress_err
        super().__init__()

    def __exit__(self, exc_type, exc_value, traceback):
        super().__exit__(exc_type, exc_value, traceback)
        if exc_type is not None:
            logger.error("%s: %s", exc_type.__name__, exc_value)
        return self._suppress

    def login(self, username: str, password: str):
        """
        Login with username and password.
        """
        response = self.post(f"{self._url}/api/login",
            json={
                "name": username,
                "password": password
            })
        if response.status_code != 200:
            raise Exception("login: Invalid username or password.")
        return response

    def get_project_list(self):
        """
        Fetch list of project
        """
        response = self.get(f"{self._url}/api/projects")
        if response.status_code != 200:
            raise Exception("get_project_list: Fail to fetch project list.")
        return response

    def get_document_list(self, project_id: int):
        """
        Fetch list of document in a project
        """
        response = self.get(f"{self._url}/api/projects/{project_id}/docs")
        if response.status_code != 200:
            raise Exception("get_document_list: Fail to fetch document list.")
        return response

    def create_project(self, project_json):
        """
        Create a project in django database
        """
        response = self.post(
                        f"{self._url}/api/projects/new", json=project_json)
        if response.status_code != 200:
            raise Exception(f"create_project: Fail to create project.")
        return response

    def create_document(self, document_json):
        """
        Create a document in django database
        """
        response = self.post(
                        f"{self._url}/api/documents/new", json=document_json)
        if response.status_code != 200:
            raise Exception(f"create_document: Fail to create document.")
        return response

    def import_project(self, project_path: str):
        """
        Post a request to django to import project
        """
        response = self.post(
            f"{self._url}/api/projects/import",
            json={"project_path": project_path}
        )
        if response.status_code != 200:
            raise Exception("import_project: Fail to import project "
                            f"from {project_path}.")
        return response

    def export_project(self, project_path: str, project_id: int):
        """
        Post a request to django to export project
        """
        response = self.post(
            f"{self._url}/api/projects/{project_id}/export",
            json={"project_path": project_path}
        )
        if response.status_code != 200:
            raise Exception("export_project: Fail to export project "
                        f"{project_id} to {project_path}.")
        return response
