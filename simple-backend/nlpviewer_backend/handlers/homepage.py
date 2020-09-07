from django.http import HttpResponse, HttpResponseBadRequest
from django.shortcuts import render
from django.views.defaults import bad_request

def index(request):
	request.session["tasks"] = request.GET.get("tasks", "")

	passed = check_url_parameters(request.session["tasks"])

	if not passed:
		return bad_request(request, None, template_name='400.html')
	return render(request, "build/index.html")


# check parameters are integers
def check_url_parameters(tasks):
	print(tasks)
	if len(tasks) == 0:
		return False
	tasks = tasks.split("-")
	try:
		for task in tasks:
			temp = int(task)
	except:
		print(tasks)
		return False
	return True

