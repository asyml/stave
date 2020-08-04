from django.http import HttpResponse
from django.forms import model_to_dict
from ..models import User
from django.contrib.auth import authenticate


def require_login(func):
    def wrapper(*args, **kwargs):
        request = args[0]
        print('current user: ', request.user)

        if not request.user.is_authenticated:
            print('not authenticated')
            return HttpResponse('no access', status=401)

        return func(*args, **kwargs)
    return wrapper

def require_admin(func):
    def wrapper(*args, **kwargs):
        request = args[0]

        try:
            userJson = model_to_dict(
                User.objects.get(pk=request.session['user_id']))
        except:
            return HttpResponse('no access', status=401)

        return func(*args, **kwargs)
    return wrapper
