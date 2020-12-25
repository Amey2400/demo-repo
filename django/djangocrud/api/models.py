from django.db import models
from rest_framework import serializers


class Movie(models.Model):
    title = models.CharField(max_length=32)
    desc = models.CharField(max_length=256)
    year = models.IntegerField()


class outputplot(models.Model):
    outputplot_id = models.PositiveIntegerField(default=-1, primary_key=True, db_column='id')
    x = models.CharField(max_length=256)
    y = models.CharField(max_length=256)