from rest_framework import serializers
from services.models import BookingModel
from services.models import CategoryModel, ServiceModel
   
class ServiceSerializer(serializers.ModelSerializer):
    category_name = serializers.CharField(source = "category.name", read_only= True)
    class Meta:
        model = ServiceModel
        fields = [
            'id',
            'category',
            'category_name',
            'name',
            'description',
            'estimated_price',
            'estimated_time',
            'created_at',
            'updated_at'
        ]
        
# 

class CategorySerializer(serializers.ModelSerializer):
    services = ServiceSerializer(many=True, read_only=True)
    class Meta:
        model = CategoryModel
        fields = [
            'id',
            
            'name',
            'description',
            'icon',
            'services',
            'created_at',
            'updated_at'
        ]


class ServiceRequestSerializer(serializers.ModelSerializer):

    customer_name = serializers.ReadOnlyField(source='customer.username')

    category = serializers.PrimaryKeyRelatedField(
        queryset=CategoryModel.objects.all(),
        write_only=True
    )
    service = serializers.PrimaryKeyRelatedField(
        queryset=ServiceModel.objects.all()
    )

    class Meta:
        model = BookingModel

        fields = [
            "id",
            "customer",
            "customer_name",
            "category",
            "service",
            "description",
            "status",
            "booking_date",
            "created_at",
        ]

        read_only_fields = [
            "id",
            "customer",
            "customer_name",
            "status",
            "booking_date",
            "created_at",
        ]

    def validate(self, attrs):
        category = attrs.pop("category")
        service = attrs["service"]

        if service.category_id != category.id:
            raise serializers.ValidationError({
                "service": "This service does not belong to the selected category."
            })

        return attrs
    
class AdminServiceRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookingModel
        fields = [
            "id",
            "customer",
            "engineer",
            "service",
            "description",
            "status",
            "booking_date",
            "created_at",
        ]
        read_only_fields = [
            "id",
            "customer",
            "service",
            "description",
            "booking_date",
            "created_at",
        ]
   
class ServiceHistorySerializer(serializers.ModelSerializer):
    service_name = serializers.ReadOnlyField(source='service.name')
    category_name = serializers.ReadOnlyField(source='service.category.name')
    engineer_name = serializers.ReadOnlyField(source='engineer.user.username')

    class Meta:
        model = BookingModel
        fields = [
            "id",
            "customer",
            "service",
            "service_name",
            "category_name",
            "engineer_name",
            "description",
            "status",
            "booking_date",
            "created_at",
        ]