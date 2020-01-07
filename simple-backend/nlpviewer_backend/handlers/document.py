from django.contrib import admin
from django.urls import include, path
from django.http import HttpResponse, JsonResponse
from django.forms import model_to_dict
import json
from ..models import Document, User
from ..lib.require_login import require_login


@require_login
def listAll(request):
    documents = Document.objects.all().values()
    return JsonResponse(list(documents), safe=False)


@require_login
def create(request):
    received_json_data = json.loads(request.body)

    doc = Document(
        name=received_json_data.get('name'),
        textPack=received_json_data.get('textPack')
    )

    doc.save()

    docJson = model_to_dict(doc)
    return JsonResponse(docJson, safe=False)


@require_login
def edit(request, document_id):
    doc = Document.objects.get(pk=document_id)
    received_json_data = json.loads(request.body)

    doc.name = received_json_data.get('name')
    doc.textPack = received_json_data.get('textPack')
    doc.save()

    docJson = model_to_dict(doc)
    return JsonResponse(docJson, safe=False)


@require_login
def query(request, document_id):
    docJson = model_to_dict(
        Document.objects.get(pk=document_id))
    return JsonResponse(docJson, safe=False)
