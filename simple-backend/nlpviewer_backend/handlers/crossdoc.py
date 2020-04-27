from django.contrib import admin
from django.conf import settings
from django.urls import include, path
from django.http import HttpResponse, JsonResponse
from django.forms import model_to_dict
import uuid
import json
from ..models import Document, User, CrossDoc
from ..lib.require_login import require_login
import os


default_type = "ft.onto.base_ontology.CrossDocEntityRelation"
index_file_path = os.path.join(settings.BASE_DIR,"nlpviewer_backend", "pack.idx")

def format_cross_doc_helper(link, next_tid):
    link["py/object"] = default_type
    link["py/state"]['_tid'] = next_tid
    link["py/state"]["_embedding"] =  []
    link["py/state"]['rel_type'] = "coreference"
    return link

def find_next_tid(textPackJson):
    max_tid = -1
    for link in textPackJson['py/state']['links']:
        if link['py/state']["_tid"] >= max_tid:
            max_tid = link['py/state']["_tid"] + 1
    return max_tid

def read_multipack_index(index_file):
    extid_to_name = {}
    with open(index_file) as f:
        for line in f:
            pairs = line.strip().split()
            external_id = int(pairs[0])
            file_name = pairs[1].split('/')[-1]
            extid_to_name[external_id] = file_name
    return extid_to_name




def listAll(request):
    crossDocs = CrossDoc.objects.all().values()
    return JsonResponse(list(crossDocs), safe=False)


@require_login
def create(request):
    received_json_data = json.loads(request.body)

    crossDoc = CrossDoc(
        name=received_json_data.get('name'),
        textPack=received_json_data.get('textPack'),
    )

    crossDoc.save()

    return JsonResponse({"id": crossDoc.id}, safe=False)

@require_login
def query(request, crossDoc_id):
    cross_doc = CrossDoc.objects.get(pk=crossDoc_id)
    text_pack = json.loads(cross_doc.textPack)
    doc_external_ids = text_pack["py/state"]["_pack_ref"]
    doc_external_id_0 = doc_external_ids[0]
    doc_external_id_1 = doc_external_ids[1]
    extid_to_name = read_multipack_index(index_file_path)
    doc_0 = Document.objects.get(name=extid_to_name[doc_external_id_0])
    doc_1 = Document.objects.get(name=extid_to_name[doc_external_id_1])

    next_cross_doc = CrossDoc.objects.filter(pk__gt=crossDoc_id).order_by('pk').first()
    if next_cross_doc == None:
        next_cross_doc_id = "-1"
    else:
        next_cross_doc_id = str(next_cross_doc.pk)
    to_return = {"crossDocPack":model_to_dict(cross_doc),"_parent": model_to_dict(doc_0), "_child":model_to_dict(doc_1), "nextCrossDocId":next_cross_doc_id}

    return JsonResponse(to_return, safe=False)



# @require_login
# def new_cross_doc_link(request, crossDoc_id):

#     crossDoc = CrossDoc.objects.get(pk=crossDoc_id)
#     docJson = model_to_dict(crossDoc)
#     textPackJson = json.loads(docJson['textPack'])
    

#     received_json_data = json.loads(request.body)
#     link = received_json_data.get('data')
#     print(link)
#     link_id = find_next_tid(textPackJson)
#     link = format_cross_doc_helper(link, link_id)

#     textPackJson['py/state']['links'].append(link)
#     crossDoc.textPack = json.dumps(textPackJson)
#     crossDoc.save()
#     print(link_id)
#     return JsonResponse({"id": link_id}, safe=False)


@require_login
def new_cross_doc_link(request, crossDoc_id):

    crossDoc = CrossDoc.objects.get(pk=crossDoc_id)
    docJson = model_to_dict(crossDoc)
    textPackJson = json.loads(docJson['textPack'])
    

    received_json_data = json.loads(request.body)
    data = received_json_data.get('data')
    link = data["link"]
    input = data["input"]

    link_id = find_next_tid(textPackJson)
    link = format_cross_doc_helper(link, link_id)
    link["py/state"]["evidence"] = input

    textPackJson['py/state']['links'].append(link)
    crossDoc.textPack = json.dumps(textPackJson)
    crossDoc.save()
    print(link_id)
    return JsonResponse({"id": str(link_id)}, safe=False)



@require_login
def delete_cross_doc_link(request, crossDoc_id, link_id):

    crossDoc = CrossDoc.objects.get(pk=crossDoc_id)
    docJson = model_to_dict(crossDoc)
    textPackJson = json.loads(docJson['textPack'])

    deleteIndex = -1
    for index, item in enumerate(textPackJson['py/state']['links']):
        if item["py/state"]['_tid'] == link_id:
            deleteIndex = index

    del textPackJson['py/state']['links'][deleteIndex]
    crossDoc.textPack = json.dumps(textPackJson)
    crossDocc.save()

    return HttpResponse('OK')

