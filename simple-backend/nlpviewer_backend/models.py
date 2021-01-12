from django.db import models

class Project(models.Model):
    # project: name, ontology, config
    # realtionship: Project.document

    name = models.CharField(max_length=200)
    project_type = models.CharField(max_length=100, default='single_pack')

    ontology = models.TextField(default='')
    multi_ontology = models.TextField(default='')
    config = models.TextField(default='')



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

class User(models.Model):
    name = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
