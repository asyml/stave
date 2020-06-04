from django.contrib import admin
from django.urls import include, path
from django.http import HttpResponse, JsonResponse
from django.forms import model_to_dict
import json
from ..models import User, CrossDoc

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
    print(turkID)
    cross_doc = CrossDoc.objects.order_by('?').first()
    to_return = {"id": str(cross_doc.pk)}

    return JsonResponse(to_return, safe=False)
