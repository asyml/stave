from django.contrib import admin
from django.urls import include, path
from django.http import HttpResponse


def createOrList(request):
    return HttpResponse("hello")


def queryOrEdit(request):
    return HttpResponse("hello")
