from django.contrib import admin
from django.urls import include, path
from django.http import HttpResponse, JsonResponse
from django.forms import model_to_dict
import json
from ..models import User


def login(request):
    received_json_data = json.loads(request.body)
    name = received_json_data.get('name')
    password = received_json_data.get('password')

    try:
        user = User.objects.get(name=name, password=password)
        request.session['user_id'] = user.id
        return HttpResponse("OK")
    except:
        return HttpResponse("Failed", status=400)


def logout(request):
    try:
        del request.session['user_id']
    except:
        1  # do nothing

    return HttpResponse("OK")
