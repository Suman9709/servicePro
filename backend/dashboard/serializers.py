from rest_framework import serializers
from .models import FeedBackModel

class FeedBackSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeedBackModel
        fields = ['name', 'email', 'message', 'created_at']