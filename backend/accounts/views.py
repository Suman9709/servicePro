from django.shortcuts import render
from rest_framework import generics
from .serializers import RegisterUserSerializer
from .models import RegisterUserModel
# Create your views here.


class RegisterUserView(generics.CreateAPIView):
    queryset = RegisterUserModel.objects.all()
    serializer_class = RegisterUserSerializer