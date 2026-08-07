from django.shortcuts import render, get_object_or_404
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from engineers.models import EngineerProfile
from engineers.serializers import CreateEngineerSerializer, EngineerProfileSerializer

from accounts.permissions import IsAdmin, IsEngineer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
# Create your views here.


class EngineerViewSet(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]
    def post(self, request):
        serializer = CreateEngineerSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(
                {
                    "message": "Engineer created successfully",
                    "data": serializer.data,
                },
                status=status.HTTP_201_CREATED
            )
# admin get all engineers
class EngineerListView(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]
    def get(self, request):
        engineers = EngineerProfile.objects.all()
        serializer = EngineerProfileSerializer(engineers, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class EngineerDetailView(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]
    def get(self, request, pk):
        engineer = get_object_or_404(EngineerProfile, pk=pk)
        serializer = EngineerProfileSerializer(engineer)
        return Response(serializer.data, status=status.HTTP_200_OK)
class EngineerProfileViewSet(APIView):
    permission_classes = [IsAuthenticated, IsEngineer]
    def get(self, request):
        engineer_profile = get_object_or_404(EngineerProfile,  user=request.user)
        serializer = EngineerProfileSerializer(engineer_profile)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
class EngineerProfileUpdateView(APIView):
    pass 

class EngineerProfileDeleteView(APIView):
    pass

