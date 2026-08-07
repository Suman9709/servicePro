from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from  accounts.permissions import IsAdmin
from  services.serializers import CategorySerializer, ServiceSerializer
from services.models import CategoryModel, ServiceModel, BookingModel

# Create your views here.

class CategoryView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsAdmin]  
    queryset = CategoryModel.objects.all()
    serializer_class = CategorySerializer


class ServiceView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsAdmin]  
    queryset = ServiceModel.objects.all()
    serializer_class = ServiceSerializer


class BookingView(viewsets.ModelViewSet):
    pass