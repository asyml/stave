from django.contrib import admin
from .models import Project, Document, CrossDoc
from django.contrib.auth.models import Permission
from guardian.admin import GuardedModelAdmin

class ProjectAdmin(GuardedModelAdmin):
    list_display = ('name', 'id', 'user')

class DocumentAdmin(GuardedModelAdmin):
    list_display = ('name', 'project')

admin.site.register(Permission)
admin.site.register(Project, ProjectAdmin)
admin.site.register(Document, DocumentAdmin)
admin.site.register(CrossDoc)
