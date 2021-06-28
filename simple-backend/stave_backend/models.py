from django.db import models
from django.contrib.auth.models import User

class Project(models.Model):
    # project: name, ontology, config
    # realtionship: 
    # - Project.document
    # - User

    name = models.CharField(max_length=200)
    project_type = models.CharField(max_length=100, default='single_pack')

    ontology = models.TextField(default='')
    config = models.TextField(default='', null=True, blank=True)
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        default='',
        related_name='projects',
        null=True,
        blank=True        
    )

    class Meta:
        permissions = (
            ('read_project', 'Can read the project'),
            ('edit_annotation', 'Can edit annotation'),
            ('edit_text', 'Can edit the document'),
            ('edit_project', 'Can edit the project'),
            ('remove_project', 'Can remove the project'),
            ('new_project', 'Can create in the project'),
        )
    
    def __str__(self):
        return self.name

class Document(models.Model):
    # content: textPack: text body + annotation

    name = models.CharField(max_length=200)
    
    # relationship: project
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        default='',
        related_name='documents',
        null=True,
        blank=True
    )

    textPack = models.TextField()

class CrossDoc(models.Model):

    name = models.CharField(max_length=200)

    # relationship: project
    project = models.ForeignKey(
        Project,
        on_delete=models.CASCADE,
        default='',
        related_name='crossdocs',
        null=True,
        blank=True
    )
    textPack = models.TextField()

class Job(models.Model):

    assigner = models.CharField(max_length=200, default='auto')
    assignee = models.CharField(max_length=200)

    pack_table = models.CharField(
        max_length=200, default='stave_backend_document')

    job_content = models.TextField(default='')

    status = models.CharField(max_length=200, default='pending')
