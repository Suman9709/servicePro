from django.shortcuts import render

# Create your views here.
from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from  accounts.permissions import IsAdmin
from  services.serializers import CategorySerializer, ServiceSerializer, ServiceRequestSerializer
from services.models import CategoryModel, ServiceModel

# Create your views here.

class CategoryView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsAdmin]  
    queryset = CategoryModel.objects.all()
    serializer_class = CategorySerializer

class CategoryListView(viewsets.ReadOnlyModelViewSet):
    permission_classes = [IsAuthenticated]  
    queryset = CategoryModel.objects.all()
    serializer_class = CategorySerializer

class ServiceView(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticated, IsAdmin]  
    queryset = ServiceModel.objects.all()
    serializer_class = ServiceSerializer


class CreateServiceRequestView(CreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = ServiceRequestSerializer
    def perform_create(self, serializer):
        serializer.save(customer=self.request.user)
    
    