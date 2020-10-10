from django.contrib import admin
from django.urls import include, path
from django.http import HttpResponse, JsonResponse
from django.forms import model_to_dict
from django.core.exceptions import ObjectDoesNotExist 
import uuid
import json
from ..models import Project, Document, User
from ..lib.require_login import require_login, require_admin
from guardian.shortcuts import get_objects_for_user

@require_login
def listAll(request):
    #TODO - not called before, thus not completed and verified
    """
    list all projects from the databse.
    accessible for user with 'view' permission
    """
    if not request.user.has_perm('nlpviewer_backend.view_project'):
        return HttpResponse('forbidden', status=403)

    projects = Project.objects.all().values()
    return JsonResponse(list(projects), safe=False)

@require_login
def list_user_projects(request):
    """
    list all projects of the current user.
    """
    projects = request.user.projects.all().values('id', 'name')
    projects_view = list(get_objects_for_user(request.user, 'nlpviewer_backend.viewer_project').all().values('id', 'name'))
    projects_user = list(request.user.projects.all().values('id', 'name'))
    projects_edit = list(get_objects_for_user(request.user, 'nlpviewer_backend.editor_project').all().values('id', 'name'))

    print(projects_view)
    print(projects_edit)
    print(projects_user)

    #print(projects_user)
    projects_list = projects_view + projects_user + projects_edit
    # print(projects_list)
    # print(list(projects))
    # print(json.dumps(projects_view))
    # print(projects_list)
    # # print(type(projects_user[0]))
    # print(projects_list)
    # projects = set().union(projects_list)
    
    # print(projects)
    #projects = set(projects_list)
    # print(type(projects_user))
    # print(type(projects_view))

    #print(projects)
    # print(type(projects))
    # print(json.dumps(list(projects)))

    return JsonResponse(projects_list, safe=False)



@require_login
def create(request):
    """
    create a new project.
    accessible for users with 'add' permission
    """
    if not request.user.has_perm('nlpviewer_backend.add_project'):
        return HttpResponse('forbidden', status=403)
 
    received_json_data = json.loads(request.body)
    project = Project(
        name=received_json_data.get('name'),
        ontology=received_json_data.get('ontology'),
        user=request.user
    )

    project.save()

    return JsonResponse({"id": project.id}, safe=False)


@require_login
def edit(request, project_id):
    """
    edit a project, query by id.
    accessible for users with 'change' permission and the owner of the project.
    """
    #TODO - not called before, thus not completed and verified
    # if project doen't exist
    try:
        project = Project.objects.get(pk=project_id)
    except ObjectDoesNotExist: 
        return HttpResponse('not found', status=404)

    # check permissions
    if not request.user.has_perm('nlpviewer_backend.change_project') and request.user != project.user:
        return HttpResponse('forbidden', status=403)

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
    accessible for users with 'view' permission and the owner of the project.
    """
    #TODO - not called before, thus not completed and verified
    # if project doen't exist
    try:
        project = Project.objects.get(pk=project_id)
    except ObjectDoesNotExist: 
        return HttpResponse('not found', status=404)
    
    # check permissions
    if not request.user.has_perm('nlpviewer_backend.view_project') and request.user != project.user:
        return HttpResponse('forbidden', status=403)

    docJson = model_to_dict(
        project)
    return JsonResponse(docJson, safe=False)

@require_login
def query_docs(request, project_id):

    # if project doen't exist
    try:
        project = Project.objects.get(pk=project_id)
    except ObjectDoesNotExist: 
        return HttpResponse('not found', status=404)
    
    # check permissions
    if (not request.user.has_perm('nlpviewer_backend.viewer_project', project) and
     not request.user.has_perm('nlpviewer_backend.editor_project', project) and
     request.user != project.user):
        return HttpResponse('forbidden', status=403)
    
    docs = project.documents.all().values()
    return JsonResponse(list(docs), safe=False)

@require_login
def delete(request, project_id):
    
    # if project doen't exist
    try:
        project = Project.objects.get(pk=project_id)
    except ObjectDoesNotExist: 
        return HttpResponse('not found', status=404)
    
    # check permissions
    if not request.user.has_perm('nlpviewer_backend.delete_project') and request.user != project.user:
        return HttpResponse('forbidden', status=403)

    project.delete()

    return HttpResponse('ok')
    