from django.contrib import admin
from django.conf import settings
from django.urls import include, path
from django.http import HttpResponse, HttpResponseBadRequest, JsonResponse
from django.forms import model_to_dict
import uuid
import json
from ..models import Document, User, CrossDoc, AnnotationLog
from ..lib.require_login import require_login
import os
import re
from ..apps import pack_index_path
from copy import deepcopy
from ..utils import gen_secret_code, read_index_file
from datetime import datetime


default_type = "edu.cmu.CrossEventRelation"

def read_creation_record(textPack):
    """
    Read teh creation record
    Get a mapping from username to a set of tids
    """
    mapping = {} # from username/forteid to their creation records
    for username in textPack["py/state"]["creation_records"]:
        tids = set(textPack["py/state"]["creation_records"][username]["py/set"])
        mapping[username] = tids
    return mapping


def delete_link(textPack, parent_event_id, child_event_id, forteID):
    """
    Delete both link and its creation record
    This function does not return, it did operations on the original textPack
    """
    mapping = read_creation_record(textPack)
    tid_to_delete = None
    index_to_delete = None
    print(parent_event_id, child_event_id)

    # delete by iterating all, and record down the wanted ones, skip the deleted one
    for index, item in enumerate(textPack["py/state"]["links"]):
        if item["py/state"]["_parent"]["py/tuple"][1] == parent_event_id and \
            item["py/state"]["_child"]["py/tuple"][1] == child_event_id and \
            forteID in mapping and \
            item["py/state"]["_tid"] in mapping[forteID]:
            tid_to_delete = item["py/state"]["_tid"]
            index_to_delete = index

    if tid_to_delete is not None:
        del textPack["py/state"]["links"][index_to_delete]
        textPack["py/state"]["creation_records"][forteID]["py/set"].remove(tid_to_delete)



def format_cross_doc_helper(uploaded_link, next_tid):
    link = deepcopy(uploaded_link)
    del link["py/state"]['coref_question_answers']
    del link["py/state"]['suggested_question_answers']

    link["py/object"] = default_type
    link["py/state"]['_tid'] = next_tid
    link["py/state"]["_embedding"] =  []

    # coref
    link["py/state"]["coref_questions"] = {
        "py/object": "forte.data.ontology.core.FList",
        "py/state": {
              "_FList__data": []
        }
    }
    link["py/state"]["coref_answers"] = []
    for item in uploaded_link["py/state"]["coref_question_answers"]:
        link["py/state"]["coref_questions"]["py/state"]["_FList__data"].append(
            {
              "py/object": "forte.data.ontology.core.Pointer",
              "py/state": {
                "_tid": item["question_id"]
              }
            })
        link["py/state"]["coref_answers"].append(item["option_id"])

    #suggested
    link["py/state"]["suggested_questions"] = {
        "py/object": "forte.data.ontology.core.FList",
        "py/state": {
              "_FList__data": []
        }
    }
    link["py/state"]["suggested_answers"] = []
    for item in uploaded_link["py/state"]["suggested_question_answers"]:
        link["py/state"]["suggested_questions"]["py/state"]["_FList__data"].append(
            {
              "py/object": "forte.data.ontology.core.Pointer",
              "py/state": {
                "_tid": item["question_id"]
              }
            })
        link["py/state"]["suggested_answers"].append(item["option_id"])
    return link

def find_and_advance_next_tid(textPackJson):
    textPackJson['py/state']['serialization']["next_id"] += 1
    return textPackJson['py/state']['serialization']["next_id"] - 1


def extract_doc_id_from_crossdoc(cross_doc):
    text_pack = json.loads(cross_doc.textPack)
    doc_external_ids = text_pack["py/state"]["_pack_ref"]
    doc_external_id_0 = doc_external_ids[0]
    doc_external_id_1 = doc_external_ids[1]
    # extid_to_name = read_index_file(pack_index_path)
    doc_0 = Document.objects.get(packID=doc_external_id_0)
    doc_1 = Document.objects.get(packID=doc_external_id_1)
    return doc_0, doc_1


def listAll(request):
    crossDocs = CrossDoc.objects.all().values()
    return JsonResponse(list(crossDocs), safe=False)




def query(request, crossDoc_Hash):
    cross_doc = CrossDoc.objects.get(idHash=crossDoc_Hash)
    doc_0, doc_1 = extract_doc_id_from_crossdoc(cross_doc)
    forteID = request.session.get('forteID', "admin_viewer")
    if "forteID" in request.session:
        request.session["startTime"] = str(datetime.now())
    to_return = {"crossDocPack":model_to_dict(cross_doc),"_parent": model_to_dict(doc_0), "_child":model_to_dict(doc_1), "forteID":forteID}
    return JsonResponse(to_return, safe=False)

# called only when user click next event
def next_crossdoc(request):
    current_task = request.session["tasks"].split("-")[request.session["current_task_index"]]
    cross_doc = CrossDoc.objects.get(idHash=current_task)
    startTime = datetime.fromisoformat(request.session["startTime"])
    endTime = datetime.now()
    totalTime = (endTime-startTime).total_seconds()
    log = AnnotationLog(forteID = request.session["forteID"], crossDocName = cross_doc.name, \
        startTime = startTime, endTime = endTime, totalTime =  totalTime)
    log.save()

    secret_code = ""
    finished = None
    print(request.session["tasks"], request.session["current_task_index"])
    if len(request.session["tasks"].split("-"))-1 > int(request.session["current_task_index"]):
        next_pk = request.session["tasks"].split("-")[int(request.session["current_task_index"])+1]
        request.session["current_task_index"] += 1
        finished = False
    else:
        next_pk = "None"
        secret_code = gen_secret_code(request.session["tasks"])
        finished = True
    to_return = {"finished": finished, "secret_code":secret_code, "id":str(next_pk)}
    return JsonResponse(to_return, safe=False)





def new_cross_doc_link(request, crossDoc_Hash):

    crossDoc = CrossDoc.objects.get(idHash=crossDoc_Hash)
    docJson = model_to_dict(crossDoc)
    textPackJson = json.loads(docJson['textPack'])
    forteID = request.session['forteID']

    received_json_data = json.loads(request.body)
    data = received_json_data.get('data')
    link = data["link"]
    print(link)

    link_id = find_and_advance_next_tid(textPackJson)
    link = format_cross_doc_helper(link, link_id)

    # delete possible duplicate link before and the creation records
    parent_event_id = link["py/state"]["_parent"]["py/tuple"][1]
    child_event_id = link["py/state"]["_child"]["py/tuple"][1]
    delete_link(textPackJson, parent_event_id, child_event_id, forteID)

    # append new link to the textpack
    textPackJson['py/state']['links'].append(link)

    # append the creation records
    if forteID not in textPackJson["py/state"]["creation_records"]:
        textPackJson["py/state"]["creation_records"][forteID] = {"py/set":[]}
    textPackJson["py/state"]["creation_records"][forteID]["py/set"].append(link_id)

    # commit to the database
    crossDoc.textPack = json.dumps(textPackJson)
    crossDoc.save()
    print(link_id)
    return JsonResponse({"crossDocPack": model_to_dict(crossDoc)}, safe=False)




def delete_cross_doc_link(request, crossDoc_Hash, link_id):
    """
    request handler, delete by tid
    """

    crossDoc = CrossDoc.objects.get(idHash=crossDoc_Hash)
    docJson = model_to_dict(crossDoc)
    textPackJson = json.loads(docJson['textPack'])
    forteID = request.session['forteID']

    deleteIndex = -1
    success = False
    for index, item in enumerate(textPackJson['py/state']['links']):
        if item["py/state"]['_tid'] == link_id:
            deleteIndex = index
            success = True
            
    if deleteIndex == -1:
        success = False
    else:
        del textPackJson['py/state']['links'][deleteIndex]
        textPackJson["py/state"]["creation_records"][forteID]["py/set"].remove(link_id)
        crossDoc.textPack = json.dumps(textPackJson)
        crossDoc.save()

    return JsonResponse({"crossDocPack": model_to_dict(crossDoc), "update_success": success}, safe=False)

