from django.http import Http404
from django.core.exceptions import PermissionDenied
from django.shortcuts import get_object_or_404, get_list_or_404
from ..models import Document, Project, Job

def check_perm_project(project, user, perm):
    if not user.has_perm(perm, project) and user != project.user:
        raise PermissionDenied

def fetch_doc_check_perm(id, user, perm):
    """Fetches a document by id and check the permission.
    
    Fetches a document by id and check whether the user has certain permission.

    Args:
        document_id:
            The id of the document.
        user:
            A User instance.
        perm:
            Permission to check. Example: "stave_backend.read_project"

    Returns:
        A json response of the or forbidden or not found.
        example:

            {"id": 42, "name": "project1-doc1-example", "project_id": 5, "textPack": "...", ...}    
    """
    doc = get_object_or_404(Document, pk=id)
    
    check_perm_project(doc.project, user, perm)

    return doc

def fetch_project_check_perm(id, user, perm):
    """Fetches a project by id and check the permission.
    
    Fetches a project by id and check whether the user has certain permission.

    Args:
        project_id:
            The id of the project.
        user:
            A User instance.
        perm:
            Permission to check. Example: "stave_backend.read_project"
            
    Returns:
        A json response of the or forbidden or not found.
        
    """
    project = get_object_or_404(Project, pk=id)
    
    check_perm_project(project, user, perm)

    return project

def fetch_job(user):
    """Fetches a job by id and check the permission.
    
    Fetches a job by id and check whether the user has certain permission.

    Args:
        user:
            A User instance.
            
    Returns:
        A json response of the or forbidden or not found.
        
    """
    jobs = get_list_or_404(Job, assignee=user)

    return jobs