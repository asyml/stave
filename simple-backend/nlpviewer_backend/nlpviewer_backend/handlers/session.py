from django.contrib import admin
from django.urls import include, path
from django.http import HttpResponse


def login(request):
    return HttpResponse("hello")


def logout(request):
    return HttpResponse("hello")
