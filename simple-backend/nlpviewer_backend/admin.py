from django.contrib import admin
from nlpviewer_backend.models import User, Document, CrossDoc, CrossDocAnnotation
admin.site.register(User)
admin.site.register(Document)
admin.site.register(CrossDoc)
admin.site.register(CrossDocAnnotation)