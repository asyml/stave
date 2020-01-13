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
        textPack=received_json_data.get('textPack'),
        ontology=received_json_data.get('ontology')
    )

    doc.save()

    return JsonResponse({"id": doc.id}, safe=False)


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


@require_login
def delete(request, document_id):
    doc = Document.objects.get(pk=document_id)
    doc.delete()

    return HttpResponse('ok')


@require_login
def new_annotation(request, document_id):
    received_json_data = json.loads(request.body)

    # get pack from db
    # generate a annotation id
    # add id to received annotation data
    # insert the annotation data into pack
    # save to db
    # return id

    return HttpResponse('OK')


@require_login
def edit_annotation(request, document_id, annotation_id):
    received_json_data = json.loads(request.body)

    # get pack from db
    # find annotation from pack
    # - return error if not found
    # update annotation with received annotation data
    # save to db
    # return OK

    return HttpResponse('OK')


@require_login
def delete_annotation(request, document_id, annotation_id):

    # get pack from db
    # remove annotation with id from pack
    # save to db
    # return OK

    return HttpResponse('OK')


@require_login
def new_link(request, document_id):
    received_json_data = json.loads(request.body)

    # get pack from db
    # generate a link id
    # add id to received link data
    # insert the link data into pack
    # save to db
    # return id

    return HttpResponse('OK')


@require_login
def edit_link(request, document_id, annotation_id):
    received_json_data = json.loads(request.body)

    # get pack from db
    # find link from pack
    # - return error if not found
    # update link with received link data
    # save to db
    # return OK

    return HttpResponse('OK')


@require_login
def delete_link(request, document_id, annotation_id):

    # get pack from db
    # remove link with id from pack
    # save to db
    # return OK

    return HttpResponse('OK')
