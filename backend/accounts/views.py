from django.shortcuts import render
from rest_framework import generics
from .serializers import  RegisterUserSerializer, MyTokenObtainPairSerializer
from .models import RegisterUserModel
from rest_framework_simplejwt.views import TokenObtainPairView


# Create your views here.


class RegisterUserView(generics.CreateAPIView):
    queryset = RegisterUserModel.objects.all()
    serializer_class = RegisterUserSerializer
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
