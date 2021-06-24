from django.contrib import admin
from django.conf import settings
from django.urls import include, path
from django.http import HttpResponse, HttpResponseBadRequest, JsonResponse
from django.forms import model_to_dict
import uuid
import json
from ..models import Document, User, CrossDoc, Project
import os
import re
from copy import deepcopy
from datetime import datetime



def listAll(request):
    crossDocs = CrossDoc.objects.all().values()
    return JsonResponse(list(crossDocs), safe=False)

def create(request):
    received_json_data = json.loads(request.body)

    crossdoc = CrossDoc(
        name=received_json_data.get('name'),
        textPack=received_json_data.get('textPack'),
        project = Project.objects.get(
            pk=received_json_data.get('project_id')
        )
    )
    crossdoc.save()

    return JsonResponse({"id": crossdoc.id}, safe=False)

def delete(request, crossdoc_id):
    crossdoc = CrossDoc.objects.get(pk=crossdoc_id)
    crossdoc.delete()

    return HttpResponse('ok')

