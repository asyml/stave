from django.db import models


class Document(models.Model):
    name = models.CharField(max_length=200)
    textPack = models.TextField()


class User(models.Model):
    name = models.CharField(max_length=200)
    password = models.CharField(max_length=200)
