from rest_framework import serializers
from .models import RegisterUserModel, EngineerProfile
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class RegisterUserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    role = serializers.ChoiceField(choices=RegisterUserModel.Role.choices, default=RegisterUserModel.Role.CUSTOMER)
    class Meta:
        model = RegisterUserModel
        fields = [
            'id', 
            'username',
            'email', 
            'phone_number', 
            'role', 
            'password',
            'created_at',
            'updated_at'
            ]
    def create(self, validated_data):
        user = RegisterUserModel.objects.create_user(
            **validated_data
        )
        return user


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
    
class EngineerProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = EngineerProfile
        fields = [
            'id',
            'user',
            'professional_title',
            'specialization',
            'experience',
            'is_available',
            'created_at',
            'updated_at'
            
        ]