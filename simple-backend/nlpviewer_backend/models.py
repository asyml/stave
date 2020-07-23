from django.db import models

class Project(models.Model):
    name = models.CharField(max_length=200)
    ontology = models.TextField(default='')

    # relationship: document -- defined in Document
    
    # documents = models.ForeignKey(
    #     to=Document,
    #     on_delete=models.CASCADE,
    #     related_name='project',
    #     default='',
    #     null=True,
    #     blank=True
    # )

class Document(models.Model):
    # content: text pack + annotation

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

class User(models.Model):
    name = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
