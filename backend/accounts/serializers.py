from rest_framework import serializers
from .models import RegisterUserModel

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