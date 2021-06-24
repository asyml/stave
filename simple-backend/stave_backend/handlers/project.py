from django.contrib import admin
from django.urls import include, path
from django.http import HttpResponse, JsonResponse
from django.forms import model_to_dict
from django.core.exceptions import ObjectDoesNotExist 
from django.contrib.auth.decorators import permission_required
import os
import uuid
import json
from ..models import Project, Document, User
from ..lib.require_login import require_login, require_admin
from ..lib.utils import fetch_project_check_perm
from ..lib.stave_project import StaveProjectReader, StaveProjectWriter
from guardian.shortcuts import get_objects_for_user

@require_login
@permission_required('stave_backend.view_project', raise_exception=True)
def listAll(request):
    """
    list all projects from the databse.
    accessible for user with 'view' permission
    """

    projects = Project.objects.all().values()
    return JsonResponse(list(projects), safe=False)

# TODO - how to fetch projects may be changed in the future
@require_login
def list_user_projects(request):
    """
    list all projects of the current user.
    """
    
    projects_read = get_objects_for_user(request.user, 'stave_backend.read_project').all().values('id', 'name')
    projects_user = request.user.projects.all().values('id', 'name')

    projects_list = list(projects_user.union(projects_read))

    return JsonResponse(projects_list, safe=False)



@require_login
@permission_required('stave_backend.add_project', raise_exception=True)
def create(request):
    """
    create a new project.
    accessible for users with 'add' permission
    """
 
    received_json_data = json.loads(request.body)

    project_type = received_json_data.get('type', 'single_pack')

    if project_type == 'single_pack':
        project = Project(
            project_type = project_type,
            name=received_json_data.get('name'),
            ontology=received_json_data.get('ontology'),
            config=received_json_data.get('config'),
            user=request.user
        )
    elif project_type == 'multi_pack':
        project = Project(
            project_type = project_type,
            name=received_json_data.get('name'),
            ontology=received_json_data.get('ontology'),
            config=received_json_data.get('config'),
            user=request.user
        )

    project.save()

    return JsonResponse({"id": project.id}, safe=False)

@require_login
def edit(request, project_id):
    """
    edit a project, query by id.
    accessible for users with 'edit_project' permission and the owner of the project.
    """
    
    project = fetch_project_check_perm(project_id, request.user, "stave_backend.edit_project")

    received_json_data = json.loads(request.body)
    project.project_name = received_json_data.get('project_name')
    project.ontology = received_json_data.get('ontology')

    project.save()

    docJson = model_to_dict(project)
    return JsonResponse(docJson, safe=False)

@require_login
def query(request, project_id):
    """
    query a project by id.
    accessible for users with 'read_project' permission and the owner of the project.
    """
    project = fetch_project_check_perm(project_id, request.user, "stave_backend.read_project")
    docJson = model_to_dict(
        project)
    return JsonResponse(docJson, safe=False)

@require_login
def query_docs(request, project_id):

    project = fetch_project_check_perm(project_id, request.user, "stave_backend.read_project")
    
    docs = project.documents.all().values()
    return JsonResponse(list(docs), safe=False)

@require_login
def query_crossdocs(request, project_id):
    project = Project.objects.get(pk=project_id)
    docs = project.documents.all().values()
    crossdocs = project.crossdocs.all().values()
    response = {"docs": list(docs), "crossdocs": list(crossdocs)}

    return JsonResponse(response, safe=False)

@require_login
def delete(request, project_id):
    
    project = fetch_project_check_perm(project_id, request.user, "stave_backend.remove_project")
    project.delete()

    return HttpResponse('ok')

@require_login
def import_project(request):
    """
    Import project from local directory into django database. The project
    directory must have the following structure:

        - project_path/
            - PROJECT_META_FILE
            - *.0.json
            - *.1.json
            - *.2.json
            ...

    Args:
        request: HTTP post request. Request body must have a field called
            `project_path` that stores the path to project directory.

    Returns:
        JsonResponse: A json response with project id.
    """

    # Create project from import directory
    received_json_data = json.loads(request.body)
    project_path = received_json_data.get("project_path")
    project_reader = StaveProjectReader(project_path=project_path)
    project = Project(
        project_type = project_reader.project_type,
        name=project_reader.project_name,
        ontology=json.dumps(project_reader.ontology),
        config=json.dumps(project_reader.project_configs),
        user=request.user
    )
    project.save()

    # Create documents from import directory
    pack_index = 0
    while True:
        doc = Document(
            name=project_reader.get_textpack_prefix(pack_index),
            textPack=json.dumps(project_reader.get_textpack(pack_index)),
            project=project
        )
        doc.save()
        next_index = project_reader.get_next_index(pack_index)
        if next_index == pack_index:
            break
        pack_index = next_index

    return JsonResponse({"id": project.id}, safe=False)

@require_login
def export_project(request, project_id):
    """
    Export a project from django database to local storage. The output
    directory will have the following structure:

        - project_path/
            - PROJECT_META_FILE
            - *.0.json
            - *.1.json
            - *.2.json
            ...

    Args:
        request: HTTP post request. Request body must have a field called
            `project_path` that specifies where to export the project.
        project_id: project id in django databse.

    Returns:
        HttpResponse: An HTTP request indicating success.
    """

    received_json_data = json.loads(request.body)
    project_path = received_json_data.get("project_path")

    # Write project meta data
    project = fetch_project_check_perm(project_id, request.user, "stave_backend.read_project")
    project_writer = StaveProjectWriter(
        project_path=project_path,
        project_name=project.name,
        project_type=project.project_type,
        ontology=json.loads(project.ontology),
        project_configs=json.loads(project.config or "null")
    )

    # Write textpacks
    for doc in project.documents.all().values():
        project_writer.write_textpack(doc["name"], doc["textPack"])

    return HttpResponse('ok')