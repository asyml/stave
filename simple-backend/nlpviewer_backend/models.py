from django.db import models
from django.contrib.auth.models import User

class Project(models.Model):
    # project: name, ontology
    # realtionship: 
    # - Project.document
    # - User

    name = models.CharField(max_length=200)
    ontology = models.TextField(default='')
    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        default='',
        related_name='projects',
        null=True,
        blank=True        
    )

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
