

from rest_framework import serializers
from services.models import BookingModel
from services.models import CategoryModel, ServiceModel


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CategoryModel
        fields = [
            'id',
            'name',
            'description',
            'icon',
            'created_at',
            'updated_at'
        ]
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

class BookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = BookingModel
        fields = [
            'id',
            'customer',
            'engineer',
            'service',
            'description',
            'status',
            'booking_date',
            'created_at'
        ]