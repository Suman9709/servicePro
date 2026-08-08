from rest_framework import serializers
from services.models import BookingModel
from services.models import CategoryModel, ServiceModel
   
class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceModel
        fields = [
            'id',
            'category',
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