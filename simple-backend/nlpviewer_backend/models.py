from django.db import models


class Document(models.Model):
    name = models.CharField(max_length=200, unique=True)
    textPack = models.TextField()
    ontology = models.TextField()

class CrossDoc(models.Model):
    name = models.CharField(max_length=200)
    textPack = models.TextField()
    ontology = models.TextField(default='')

class CrossDocAnnotation(models.Model):
    name = models.CharField(max_length=200)
    turkID = models.TextField()
    textPack = models.TextField()
    ontology = models.TextField()

class User(models.Model):
    name = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
