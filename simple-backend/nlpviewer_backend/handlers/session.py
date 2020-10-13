from django.contrib import admin
from django.urls import include, path
from django.http import HttpResponse, JsonResponse, HttpResponseBadRequest
from django.forms import model_to_dict
import json
from ..models import User, CrossDoc
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

    # this is only for testing !!!
    for key in list(request.session.keys()):
        del request.session[key]
    idHashs = CrossDoc.objects.all()[:2]
    idHashs = [item.idHash for item in idHashs]
    request.session["tasks"] = idHashs[0] + "-" + idHashs[1]

    passed = check_url_parameters(request.session["tasks"])

    if not passed:
        return bad_request(request, None, template_name='400.html')

    print(request.body)
    received_json_data = json.loads(request.body)
    turkID = received_json_data.get('turkID')
    request.session['forteID'] = "stave."+turkID

    request.session["current_task_index"] = 0
    current_task = request.session["tasks"].split("-")[0]

    print("now working on:", current_task)

    to_return = {"id": str(current_task), "forteID":request.session['forteID']}

    return JsonResponse(to_return, safe=False)    


def login_viewer(request):
    received_json_data = json.loads(request.body)
    admin_code = received_json_data.get('adminCode')
    if admin_code == "kairos":
        return HttpResponse("OK")
    else:
        return HttpResponseBadRequest("Wrong password")

def get_min_count_cross_doc(forteID):
    template_names = set()
    annotated_count = defaultdict(int)
    all_templates = CrossDoc.objects.all()

    for item in all_templates:
        textPack = json.loads(item.textPack)
        mapping = {} # from username/forteid to their creation records
        for username in textPack["py/state"]["creation_records"]:
            tids = set(textPack["py/state"]["creation_records"][username]["py/set"])
            mapping[username] = tids
        if len(mapping) < 3 and forteID not in mapping:
            return item.pk
    return -1


# check parameters are sha256 hash (64 characters)
def check_url_parameters(tasks):
    print(tasks)
    if len(tasks) == 0:
        return False
    tasks = tasks.split("-")
    try:
        for task in tasks:
            if len(task) != 64:
                return False
    except:
        print(tasks)
        return False
    return True

