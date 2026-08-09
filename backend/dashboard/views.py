from django.shortcuts import render

from accounts.models import RegisterUserModel
from rest_framework import viewsets
from services.serializers import AdminServiceRequestSerializer, CategorySerializer
from engineers.serializers import EngineerProfileSerializer
from dashboard.serializers import FeedBackSerializer
from dashboard.models import FeedBackModel
from services.models import BookingModel, CategoryModel
from accounts.serializers import CustomerProfileSerializer

# Create your views here.

class GetAllEngineersList(viewsets.ModelViewSet):
    queryset = RegisterUserModel.objects.filter(role=RegisterUserModel.Role.ENGINEER)
    serializer_class = EngineerProfileSerializer
    

class GetAllCustomersList(viewsets.ModelViewSet):
    queryset = RegisterUserModel.objects.filter(role=RegisterUserModel.Role.CUSTOMER)
    serializer_class = CustomerProfileSerializer


class GetAllServiceRequestsList(viewsets.ModelViewSet):
    queryset = BookingModel.objects.all()
    serializer_class = AdminServiceRequestSerializer

class GetAllServiceCategoriesList(viewsets.ModelViewSet):
    queryset = CategoryModel.objects.all()
    serializer_class = CategorySerializer
    
    pass

class GetAllFeedbacksList(viewsets.ModelViewSet):
    queryset = FeedBackModel.objects.all()
    serializer_class = FeedBackSerializer
    pass
