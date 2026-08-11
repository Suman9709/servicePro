from rest_framework import serializers
from .models import  RegisterUserModel
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class RegisterUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    role = serializers.ChoiceField(choices=RegisterUserModel.Role.choices, default=RegisterUserModel.Role.CUSTOMER)
    class Meta:
        model = RegisterUserModel
        fields = [
            'id', 
            'first_name',
            'last_name',
            'username',
            'email', 
            'phone_number', 
            'role', 
            'password',
            'address',
            'created_at',
            'updated_at'
            ]
    def create(self, validated_data):
        user = RegisterUserModel.objects.create_user(
            **validated_data
        )
        return user
    def validate_role(self, value):
        if value == "admin":
            raise serializers.ValidationError(
                "Admin account cannot be created."
            )
        return value
        
 
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user
        data.update({
            "user":{
                "id": user.id,
                "email":user.email,
                "role":user.role,
            }
        })
        return data
    
class CustomerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = RegisterUserModel
        fields = [
            'id',
            'username',
            'email',
            'phone_number',
            'role',
            'address',
            'created_at',
            'updated_at'
        ]
