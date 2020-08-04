from django.contrib import admin
from django.urls import include, path
from django.http import HttpResponse, JsonResponse
from django.forms import model_to_dict
import uuid
import json
from ..models import Project, Document, User
from ..lib.require_login import require_login
from django.contrib.auth.decorators import login_required


@require_login
def listAll(request):
    projects = Project.objects.all().values()
    return JsonResponse(list(projects), safe=False)


@require_login
def create(request):
    received_json_data = json.loads(request.body)

    project = Project(
        name=received_json_data.get('name'),
        ontology=received_json_data.get('ontology')
    )

    project.save()

    return JsonResponse({"id": project.id}, safe=False)


@require_login
def edit(request, project_id):
    project = Project.objects.get(pk=project_id)
    received_json_data = json.loads(request.body)

    project.project_name = received_json_data.get('project_name')
    project.ontology = received_json_data.get('ontology')

    project.save()

    docJson = model_to_dict(pro)
    return JsonResponse(docJson, safe=False)


@require_login
def query(request, project_id):
    docJson = model_to_dict(
        Project.objects.get(pk=project_id))
    return JsonResponse(docJson, safe=False)

@require_login
def query_docs(request, project_id):
    project = Project.objects.get(pk=project_id)
    docs = project.documents.all().values()

    return JsonResponse(list(docs), safe=False)

@require_login
def delete(request, project_id):
    project = Project.objects.get(pk=project_id)
    project.delete()

    return HttpResponse('ok')
    