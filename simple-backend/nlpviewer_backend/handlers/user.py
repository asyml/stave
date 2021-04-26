from django.contrib import admin
from django.urls import include, path
from django.http import HttpResponse, JsonResponse
from django.forms import model_to_dict
import json
from ..models import User
from ..lib.require_login import require_login


@require_login
def listAll(request):
    users = User.objects.all().values()
    return JsonResponse(list(users), safe=False)


@require_login
def create(request):
    received_json_data = json.loads(request.body)

    user = User.objects.create_user(
        username=received_json_data.get('name'),
        password=received_json_data.get('password')
    )
    user.save()

    userJson = model_to_dict(user)
    return JsonResponse(userJson, safe=False)

def signup(request):
    received_json_data = json.loads(request.body)

    user = User.objects.create_user(
        username=received_json_data.get('name'),
        password=received_json_data.get('password')
    )
    user.save()

    userJson = model_to_dict(user)
    return JsonResponse(userJson, safe=False)


@require_login
def edit(request, user_id):
    user = User.objects.get(pk=user_id)
    received_json_data = json.loads(request.body)

    user.name = received_json_data.get('name')
    user.set_password(received_json_data.get('password'))
    user.save()

    userJson = model_to_dict(user)
    return JsonResponse(userJson, safe=False)


@require_login
def delete(request, user_id):
    user = User.objects.get(pk=user_id)
    user.delete()

    return HttpResponse('ok')


@require_login
def query(request, user_id):
    userJson = model_to_dict(
        User.objects.get(pk=user_id))
    return JsonResponse(userJson, safe=False)
