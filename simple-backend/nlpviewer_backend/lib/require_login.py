from django.http import HttpResponse
from django.forms import model_to_dict
from ..models import User
from django.contrib.auth import authenticate


def require_login(func):
    def wrapper(*args, **kwargs):
        request = args[0]
        if not request.user.is_authenticated:
            return HttpResponse('unauthenticated', status=401)
        return func(*args, **kwargs)
    return wrapper

def require_admin(func):
    """
    accessible by superusers defined in django.
    """
    def wrapper(*args, **kwargs):
        request = args[0]
        if not request.user.is_superuser:
            return HttpResponse('forbidden', status=403)
        return func(*args, **kwargs)
    return wrapper
