from django.http import HttpResponse, HttpResponseBadRequest
from django.shortcuts import render
from django.views.defaults import bad_request

def index(request):
	request.session["tasks"] = request.GET.get("tasks", "")


	return render(request, "build/index.html")




