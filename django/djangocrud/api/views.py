from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from .serializers import MovieSerializer, MovieMiniSerializer, outputplotSerializer
from .models import Movie
from rest_framework.response import Response
from django.shortcuts import render
import requests
from subprocess import run, PIPE
import sys
from .models import Movie, outputplot
from django.http import HttpResponse


class MovieViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Movie.objects.all()
    serializer_class = MovieSerializer

    def list(self, request, *args, **kwargs):
        movies = Movie.objects.all()
        serializer = MovieMiniSerializer(movies, many=True)
        return Response(serializer.data)


class outputplotViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = outputplot.objects.all()
    serializer_class = outputplotSerializer


def external(request):
    movies = Movie.objects.all()
    serializer = MovieSerializer(movies, many=True)
    #print(serializer.data)
    inp = ''
    inptitle = ''
    for i in serializer.data:
        for key, value in i.items():
            if key == "id":
                inp = inp+" "+str(value)
            if key == "title":
                inptitle = inptitle+" "+value
    out = run([sys.executable, 'C:\\Users\\amey sonje\\Desktop\\test.py', inp], shell=False, stdout=PIPE)

    print(out)

    xa, ya = out.stdout.decode("utf-8").split(';');


    print(xa, ya)
    outputplot.objects.all().delete()
    outputplot.objects.update_or_create(outputplot_id=1, x=xa, y=ya)
    return HttpResponse()