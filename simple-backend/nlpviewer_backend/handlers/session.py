from django.contrib import admin
from django.urls import include, path
from django.http import HttpResponse, JsonResponse
from django.forms import model_to_dict
import json
from ..models import User, CrossDoc, CrossDocAnnotation
from collections import defaultdict

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

    min_name = get_min_count_cross_doc()
    cross_doc = CrossDoc.objects.get(name=min_name)
    print(min_name)

    new_cross_doc_anno = CrossDocAnnotation()
    new_cross_doc_anno.name = cross_doc.name
    new_cross_doc_anno.turkID = turkID
    new_cross_doc_anno.textPack = cross_doc.textPack
    new_cross_doc_anno.ontology = cross_doc.ontology
    new_cross_doc_anno.save()

    to_return = {"id": str(new_cross_doc_anno.pk)}

    return JsonResponse(to_return, safe=False)

def get_min_count_cross_doc():
    template_names = set()
    annotated_count = defaultdict(int)
    all_templates = CrossDoc.objects.all()
    for item in all_templates:
        template_names.add(item.name)

    all_annotated = CrossDocAnnotation.objects.all()
    for item in all_annotated:
        annotated_count[item.name] += 1

    min_count = 2**14
    min_name = None
    print(template_names)
    print(annotated_count)
    for name in template_names:
        if annotated_count[name] < min_count:
            min_count = annotated_count[name]
            min_name = name
    return min_name

