from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.
class RegisterUserModel(AbstractUser):
    class Role(models.TextChoices):
        ADMIN = 'admin', 'Admin'
        CUSTOMER = 'customer', 'Customer'
        ENGINEER = 'engineer', 'Engineer'

    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15)
    role = models.CharField(max_length=20, choices=Role.choices, default=Role.CUSTOMER)
    address = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    
    def __str__(self):
        return self.email
    



    
