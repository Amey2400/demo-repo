from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import Movie, outputplot


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ('id', 'title', 'desc', 'year')


class MovieMiniSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ('id', 'title')


class outputplotSerializer(serializers.ModelSerializer):
    class Meta:
        model = outputplot
        fields = ['outputplot_id', 'x', 'y']