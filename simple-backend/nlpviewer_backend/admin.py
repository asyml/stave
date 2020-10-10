from django.contrib import admin
from .models import Project, Document
from guardian.admin import GuardedModelAdmin


# admin.site.register(Project)
# admin.site.register(Document)

class ProjectAdmin(GuardedModelAdmin):
    pass

class DocumentAdmin(GuardedModelAdmin):
    pass

admin.site.register(Project, ProjectAdmin)
admin.site.register(Document, DocumentAdmin)