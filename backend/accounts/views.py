from django.shortcuts import render
from rest_framework import generics
# from rest_framework import
from rest_framework import viewsets
from  accounts.permissions import IsAdmin
from .serializers import  RegisterUserSerializer, MyTokenObtainPairSerializer
from .models import RegisterUserModel
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken, TokenError


# Create your views here.


class RegisterUserView(generics.CreateAPIView):
    queryset = RegisterUserModel.objects.all()
    serializer_class = RegisterUserSerializer
    permission_classes = [AllowAny]
    
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
    def post(self, request, *args, **kwargs):
        
        response = super().post(request, *args, **kwargs)
        
        access_token = response.data.get('access')
        refresh_token = response.data.get('refresh')
        
        
        response.set_cookie(
            'access_token', access_token, httponly=True, secure=True, samesite='None'
        )
        response.set_cookie(
            'refresh_token', refresh_token, httponly=True, secure=True, samesite='None' 
        )
        response.data.pop("access")
        response.data.pop("refresh")
        return response

class UserListView(viewsets.ModelViewSet):
    queryset = RegisterUserModel.objects.all()
    serializer_class = RegisterUserSerializer
    permission_classes = [
        IsAuthenticated,
        IsAdmin
    ]


class ProfileView(generics.RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = RegisterUserSerializer

    def get_object(self):
        return self.request.user
    
    
class Logout(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        refresh_token = request.COOKIES.get('refresh_token')
        if refresh_token:
            
            try:
                token = RefreshToken(refresh_token)
                token.blacklist()
                
            except TokenError:
                pass
       
        response = Response(
            {
                "message": "Logout successful"
            }
        )
        response.delete_cookie('access_token',samesite='None')
        response.delete_cookie('refresh_token',samesite='None')
        return response

