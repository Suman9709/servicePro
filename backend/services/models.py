from django.db import models

# Create your models here.
from django.db import models

from accounts.models import RegisterUserModel
from engineers.models import EngineerProfile

# Create your models here.
class CategoryModel(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    icon = models.ImageField(upload_to='category_icons/', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name




class ServiceModel(models.Model):
    category = models.ForeignKey(CategoryModel, on_delete = models.CASCADE, related_name='services')
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    estimated_price = models.DecimalField(max_digits=10, decimal_places=2)
    estimated_time = models.DurationField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name
    


class BookingModel(models.Model):
    
    class BookingStatus(models.TextChoices):
        PENDING = ('pending', 'Pending')
        ACCEPTED = ('accepted', 'Accepted')
        COMPLETED = ('completed', 'Completed')
        CANCELLED = ('cancelled', 'Cancelled')
    
    customer = models.ForeignKey(RegisterUserModel, on_delete = models.PROTECT, related_name = 'customer_bookings')
    engineer = models.ForeignKey(EngineerProfile, on_delete = models.SET_NULL, related_name='assigned_bookings',  blank=True, null=True)
    service = models.ForeignKey(ServiceModel, on_delete= models.PROTECT, related_name='service_booking')
    description = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=BookingStatus.choices, default=BookingStatus.PENDING)
    booking_date = models.DateTimeField(auto_now_add=True)
     
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Booking {self.id} - {self.service.name} for {self.customer.username}"
    