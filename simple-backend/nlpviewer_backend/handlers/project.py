from django.contrib import admin
from django.urls import include, path
from django.http import HttpResponse, JsonResponse
from django.forms import model_to_dict
import uuid
import json
from ..models import Project, Document, User
from ..lib.require_login import require_login


@require_login
def listAll(request):
    projects = Project.objects.all().values()
    return JsonResponse(list(projects), safe=False)


@require_login
def create(request):
    received_json_data = json.loads(request.body)

    project_type = received_json_data.get('type', 'indoc')

    if project_type == 'indoc':

        project = Project(
            project_type = project_type,
            name=received_json_data.get('name'),
            ontology=received_json_data.get('ontology'),
            config=received_json_data.get('config')
        )
    elif project_type == 'crossdoc':
        project = Project(
            project_type = project_type,
            name=received_json_data.get('name'),
            ontology=received_json_data.get('ontology'),
            multi_ontology = received_json_data.get('multiOntology'),
            config=received_json_data.get('config')
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
def query_crossdocs(request, project_id):
    project = Project.objects.get(pk=project_id)
    docs = project.documents.all().values()
    crossdocs = project.crossdocs.all().values()
    response = {"docs": list(docs), "crossdocs": list(crossdocs)}

    return JsonResponse(response, safe=False)

@require_login
def delete(request, project_id):
    project = Project.objects.get(pk=project_id)
    project.delete()

    return HttpResponse('ok')
