from django.contrib import admin
from django.urls import include, path
from django.http import HttpResponse, JsonResponse, HttpResponseBadRequest
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

    # # this is only for testing !!!
    # request.session["tasks"] = "1-2"
    passed = check_url_parameters(request.session["tasks"])

    if not passed:
        return bad_request(request, None, template_name='400.html')

    # debug need to comment out when in production
    print(request.body)
    received_json_data = json.loads(request.body)
    turkID = received_json_data.get('turkID')
    request.session['forteID'] = "stave."+turkID

    # pk = get_min_count_cross_doc(request.session['forteID'])
    request.session["current_task_index"] = 0
    pk = request.session["tasks"].split("-")[0]

    print("get pk", pk)

    # if pk == -1:
    #     return HttpResponseBadRequest()

    to_return = {"id": str(pk)}

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
    # min_count = 2**14
    # min_name = None
    # for name in template_names:
    #     mylist = CrossDocAnnotation.objects.filter(name = name, turkID=turkID)
    #     anno_before = True if len(mylist)>0 else False
    #     print(name, anno_before)
    #     if (not anno_before) and (annotated_count[name] < min_count):
    #         min_count = annotated_count[name]
    #         min_name = name
    # return min_name

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

