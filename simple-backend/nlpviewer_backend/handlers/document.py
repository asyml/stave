from django.contrib import admin
from django.urls import include, path
from django.http import HttpResponse, JsonResponse
from django.forms import model_to_dict
import uuid
import json
from ..models import Document, User
from ..lib.require_login import require_login



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

    # get pack from db
    # generate a annotation id
    # add id to received annotation data
    # insert the annotation data into pack
    # - get text pack from dock
    # - parse text pack to json
    # - append annotatition to annotations in json
    # - stringify the updated json and update the textPack in doc
    # - save back to doc

    # Example post data
    # {
    #     "py/object": "forte.data.ontology.base_ontology.EntityMention",
    #     "py/state": {
    #         "_span": {
    #             "begin": 0,
    #             "end": 8,
    #             "py/object": "forte.data.base.Span"
    #         },
    #         "_tid": 1,
    #         "ner_type": "DATE"
    #     }
    # }
    received_json_data = json.loads(request.body)
    doc = Document.objects.get(pk=document_id)

    annotation_id = str(uuid.uuid1())
    annotation = received_json_data.get('data')
    annotation["py/state"]['_tid'] = annotation_id

    docJson = model_to_dict(doc)
    textPackJson = json.loads(docJson['textPack'])
    textPackJson['py/state']['annotations'].append(annotation)
    doc.textPack = json.dumps(textPackJson)
    doc.save()

    return JsonResponse({"id": annotation_id}, safe=False)


@require_login
def edit_annotation(request, document_id, annotation_id):
    received_json_data = json.loads(request.body)

    # get pack from db
    # find annotation from pack
    # - return error if not found
    # update annotation with received annotation data
    # save to db
    # return OK

    received_json_data = json.loads(request.body)
    doc = Document.objects.get(pk=document_id)
    annotation = received_json_data.get('data')

    docJson = model_to_dict(doc)
    textPackJson = json.loads(docJson['textPack'])

    for index, item in enumerate(textPackJson['py/state']['annotations']):
        if item["py/state"]['_tid'] == annotation_id:
            textPackJson['py/state']['annotations'][index] = annotation

    doc.textPack = json.dumps(textPackJson)
    doc.save()

    return HttpResponse('OK')
    # return JsonResponse(model_to_dict(doc), safe=False)


@require_login
def delete_annotation(request, document_id, annotation_id):

    # get pack from db
    # remove annotation with id from pack
    # save to db
    # return OK

    doc = Document.objects.get(pk=document_id)
    docJson = model_to_dict(doc)
    textPackJson = json.loads(docJson['textPack'])

    deleteIndex = -1
    for index, item in enumerate(textPackJson['py/state']['annotations']):
        if item["py/state"]['_tid'] == annotation_id:
            deleteIndex = index

    del textPackJson['py/state']['annotations'][deleteIndex]
    doc.textPack = json.dumps(textPackJson)
    doc.save()

    return HttpResponse('OK')
    # return JsonResponse(model_to_dict(doc), safe=False)


@require_login
def new_link(request, document_id):

    # get pack from db
    # generate a link id
    # add id to received link data
    # insert the link data into pack
    # save to db
    # return id

    # example post data
    # {
    #     "py/object": "forte.data.ontology.base_ontology.PredicateLink",
    #     "py/state": {
    #       "_child": 5,
    #       "_parent": 10,
    #       "_tid": 34,
    #       "arg_type": "ARG0"
    #     }
    #   }

    received_json_data = json.loads(request.body)
    doc = Document.objects.get(pk=document_id)

    link_id = str(uuid.uuid1())
    link = received_json_data.get('data')
    link["py/state"]['_tid'] = link_id

    docJson = model_to_dict(doc)
    textPackJson = json.loads(docJson['textPack'])
    textPackJson['py/state']['links'].append(link)
    doc.textPack = json.dumps(textPackJson)
    doc.save()

    return JsonResponse({"id": link_id}, safe=False)


@require_login
def edit_link(request, document_id, link_id):
    received_json_data = json.loads(request.body)
    doc = Document.objects.get(pk=document_id)
    link = received_json_data.get('data')

    docJson = model_to_dict(doc)
    textPackJson = json.loads(docJson['textPack'])

    for index, item in enumerate(textPackJson['py/state']['links']):
        if item["py/state"]['_tid'] == link_id:
            textPackJson['py/state']['links'][index] = link

    doc.textPack = json.dumps(textPackJson)
    doc.save()

    return HttpResponse('OK')


@require_login
def delete_link(request, document_id, link_id):

    doc = Document.objects.get(pk=document_id)
    docJson = model_to_dict(doc)
    textPackJson = json.loads(docJson['textPack'])

    deleteIndex = -1
    for index, item in enumerate(textPackJson['py/state']['links']):
        if item["py/state"]['_tid'] == link_id:
            deleteIndex = index

    del textPackJson['py/state']['links'][deleteIndex]
    doc.textPack = json.dumps(textPackJson)
    doc.save()

    return HttpResponse('OK')
