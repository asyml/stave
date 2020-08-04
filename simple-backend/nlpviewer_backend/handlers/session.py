from django.contrib import admin
from django.urls import include, path
from django.http import HttpResponse, JsonResponse
from django.forms import model_to_dict
from django.contrib import auth
import json
from ..models import User


def login(request):
    received_json_data = json.loads(request.body)
    username = received_json_data.get('name')
    password = received_json_data.get('password')

    print(username, password)

    user = auth.authenticate(username=username, password=password)

    print(user)

    if user:
        auth.login(request, user=user)
        return HttpResponse("OK")
    else:
        return HttpResponse("Failed", status=400)


def logout(request):
    auth.logout(request)

    return HttpResponse("OK")

def signup(request):
    received_json_data = json.loads(request.body)
    new_name = received_json_data.get('name')
    new_password = received_json_data.get('password')
