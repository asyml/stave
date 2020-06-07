from django.contrib import admin
from django.urls import include, path
from django.http import HttpResponse, JsonResponse
from django.forms import model_to_dict
import json
from ..models import User, CrossDoc, CrossDocAnnotation

def login(request):
    print(request.body)
    received_json_data = json.loads(request.body)
    name = received_json_data.get('name')
    password = received_json_data.get('password')
    print(name, password)

    try:
        user = User.objects.get(name=name, password=password)
        request.session['user_id'] = user.id
        return HttpResponse("OK")
    except Exception as e:
        print(e)
        return HttpResponse("Failed", status=400)


def logout(request):
    try:
        del request.session['user_id']
    except:
        1  # do nothing

    return HttpResponse("OK")





#### only for cross doc login

def login_amazon_turk(request):
    print(request.body)
    received_json_data = json.loads(request.body)
    turkID = received_json_data.get('turkID')
    request.session['turkID'] = turkID
    print(turkID)
    cross_doc = CrossDoc.objects.order_by('?').first()

    new_cross_doc_anno = CrossDocAnnotation()
    new_cross_doc_anno.name = cross_doc.name
    new_cross_doc_anno.turkID = turkID
    new_cross_doc_anno.textPack = cross_doc.textPack
    new_cross_doc_anno.ontology = cross_doc.ontology
    new_cross_doc_anno.save()

    to_return = {"id": str(new_cross_doc_anno.pk)}

    return JsonResponse(to_return, safe=False)
