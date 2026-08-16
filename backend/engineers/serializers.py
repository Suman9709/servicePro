from rest_framework import serializers
from accounts.models import RegisterUserModel
from django.db import transaction
from .models import EngineerProfile
from services.models import BookingModel, CategoryModel, ServiceModel
from rest_framework.validators import UniqueValidator

class EngineerProfileSerializer(serializers.ModelSerializer):

    email = serializers.EmailField(
        source="user.email",

    )

    username = serializers.CharField(
        source="user.username",

    )

    phone_number = serializers.CharField(
        source="user.phone_number",

    )
    professional_title = serializers.CharField(
        source="professional_title",
    ),
    specialization = serializers.CharField(
        source="specialization",
        required=False,
        allow_blank=True
    ),
    experience = serializers.CharField(
        source="experience",
    ),
    class Meta:
        model = EngineerProfile

        fields = [
            "id",
            "email",
            "username",
            "phone_number",
            "professional_title",
            "specialization",
            "experience",
            "is_available",
            "created_at",
            "updated_at",
        ]




class CreateEngineerSerializer(serializers.ModelSerializer):

    username = serializers.CharField(
        write_only=True,
        validators=[UniqueValidator(queryset=RegisterUserModel.objects.all(), message="A user with that username already exists.")]
    )
    email = serializers.EmailField(
        write_only=True,
        validators=[UniqueValidator(queryset=RegisterUserModel.objects.all(), message="A user with that email already exists.")]
    )
    phone_number = serializers.CharField(write_only=True)
    password = serializers.CharField(write_only=True)

    class Meta:
        model = EngineerProfile
        fields = [
            "id",
            "username",
            "email",
            "phone_number",
            "password",
            "professional_title",
            "specialization",
            "experience",
        ]
        extra_kwargs = {
            "specialization": {"required": False, "allow_blank": True}
        }

    @transaction.atomic
    def create(self, validated_data):

        username = validated_data.pop("username")
        email = validated_data.pop("email")
        phone_number = validated_data.pop("phone_number")
        password = validated_data.pop("password")

        professional_title = validated_data.pop("professional_title")
        specialization = validated_data.pop("specialization", "")
        experience = validated_data.pop("experience")

        # Create user
        user = RegisterUserModel.objects.create_user(
            username=username,
            email=email,
            phone_number=phone_number,
            password=password,
            role=RegisterUserModel.Role.ENGINEER
        )

        # Create engineer profile
        engineer_profile = EngineerProfile.objects.create(
            user=user,
            professional_title=professional_title,
            specialization=specialization,
            experience=experience
        )

        return engineer_profile

    def to_representation(self, instance):
        return EngineerProfileSerializer(instance, context=self.context).data
    
    
class EngineerRequestSerializer(serializers.ModelSerializer):

    customer_name = serializers.ReadOnlyField(
        source="customer.username"
    )

    category_name = serializers.ReadOnlyField(
        source="service.category.name"
    )

    service_name = serializers.ReadOnlyField(
        source="service.name"
    )

    class Meta:
        model = BookingModel

        fields = [
            "id",
            "customer",
            "customer_name",
            "category_name",
            "service",
            "service_name",
            "description",
            "status",
            "booking_date",
            "created_at",
        ]

        read_only_fields = [
            "id",
            "customer",
            "customer_name",
            "category_name",
            "service",
            "service_name",
            "description",
            "booking_date",
            "created_at",
        ]

    def validate_status(self, value):

        allowed_status = [
            BookingModel.BookingStatus.ACCEPTED,
            BookingModel.BookingStatus.COMPLETED,
            BookingModel.BookingStatus.CANCELLED,
        ]

        if value not in allowed_status:
            raise serializers.ValidationError(
                "Invalid status."
            )

        return value