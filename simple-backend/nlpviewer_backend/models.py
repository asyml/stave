from django.db import models

# class Ontology(models.Model):
#     ontology_name = models.CharField(max_length=200)
#     ontology_content = models.TextField(default='')

class Project(models.Model):
    name = models.CharField(max_length=200)
    ontology = models.TextField(default='')
    # ontology = models.TextField(default='')

    # relationship: document 
    
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
    ontology = models.TextField(default='')

    # migration: ontology - TextField

class User(models.Model):
    name = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
