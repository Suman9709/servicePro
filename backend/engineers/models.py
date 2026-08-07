from django.db import models

from accounts.models import RegisterUserModel

# Create your models here.
class EngineerProfile(models.Model):
    user = models.OneToOneField(RegisterUserModel, on_delete = models.CASCADE, related_name='engineer_profile')
    professional_title = models.CharField(max_length=100)
    specialization = models.TextField(blank=True)
    experience = models.PositiveIntegerField()
    is_available = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return f"{self.user.username}'s Profile"