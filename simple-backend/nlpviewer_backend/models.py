from django.db import models
from datetime import datetime

class Document(models.Model):
    name = models.CharField(max_length=200)
    packID = models.IntegerField(unique = True, null=True)
    textPack = models.TextField()
    ontology = models.TextField()

class CrossDoc(models.Model):
    name = models.CharField(max_length=200)
    packID = models.IntegerField(unique = True, null=True)
    idHash = models.CharField(max_length=200, default="")
    textPack = models.TextField()
    ontology = models.TextField(default='')


class AnnotationLog(models.Model):
    forteID = models.CharField(max_length = 200)
    crossDocName = models.CharField(max_length = 200)
    startTime = models.DateTimeField(default=datetime.now(), blank=True)
    endTime = models.DateTimeField(default=datetime.now(), blank=True)
    totalTime = models.IntegerField(blank=True) # in seconds



class User(models.Model):
    name = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
