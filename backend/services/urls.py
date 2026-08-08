from django.urls import path
from rest_framework.routers import DefaultRouter
from services.views import CategoryView, ServiceView, CreateServiceRequestView

router = DefaultRouter()

router.register(r'categories', CategoryView, basename='category')
router.register(r'allservices', ServiceView, basename='service')
# router.register(r'bookings', CreateServiceRequestView, basename='booking')

urlpatterns =[
    path('bookings/', CreateServiceRequestView.as_view(), name='create-service-request'),
]+ router.urls