from django.shortcuts import  get_object_or_404

from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from accounts.models import RegisterUserModel
from services.models import BookingModel
from services.serializers import ServiceHistorySerializer
from engineers.models import EngineerProfile
from engineers.serializers import CreateEngineerSerializer, EngineerProfileSerializer,EngineerRequestSerializer


from accounts.permissions import IsAdmin, IsEngineer,IsEngineerOrAdmin
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from accounts.models import RegisterUserModel

# Create your views here.


class EngineerCreateView(APIView):
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
    
    
class EngineerProfileView(APIView):
    permission_classes = [IsAuthenticated, IsEngineer]
    def get(self, request):
        engineer_profile = get_object_or_404(EngineerProfile,  user=request.user)
        serializer = EngineerProfileSerializer(engineer_profile)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    
class EngineerProfileUpdateView(APIView):
    permission_classes = [IsAuthenticated, IsEngineerOrAdmin]
    def put(self, request, pk=None):
        if request.user.role ==RegisterUserModel.Role.ENGINEER:
            engineer_profile = get_object_or_404(EngineerProfile, user=request.user)
        else:
            engineer_profile = get_object_or_404(EngineerProfile, pk=pk)
            
        serializer = EngineerProfileSerializer(engineer_profile, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(
            {
                "message": "Engineer profile updated successfully",
                "data": serializer.data,
            },
            status=status.HTTP_200_OK
        )

class EngineerProfileDeleteView(APIView):
    permission_classes = [IsAuthenticated, IsAdmin]
    def delete(self, request, pk):
        engineer_profile = get_object_or_404(EngineerProfile, pk=pk)
        engineer_profile.user.delete()
        return Response(
            {
                "message": "Engineer profile deleted successfully",
                
            },
            status=status.HTTP_204_NO_CONTENT
        )
    
# customer

# admin can get all the customers and their details

class CustomerServiceHistoryView(APIView):
    permission_classes = [IsAuthenticated]
    def get(self, request):
        bookings = BookingModel.objects.filter(customer = request.user).select_related('service', 'service__category', 'engineer').order_by('-booking_date')
        serializer = ServiceHistorySerializer(bookings, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class EngineerGetAllService(ModelViewSet):
    permission_classes = [IsAuthenticated, IsEngineer]
    serializer_class  = EngineerRequestSerializer
    def get_queryset(self):
        return BookingModel.objects.filter(
            engineer__user= self.request.user
        ).select_related(
            "customer",
            "service",
            "service__category",
            "engineer",
            "engineer__user",
            )
    def perform_update(self, serializer):
        serializer.save()