from django.urls import path
from rest_framework.routers import DefaultRouter
from services.views import CategoryView, ServiceView, BookingView

router = DefaultRouter()

router.register(r'categories', CategoryView, basename='category')
router.register(r'services', ServiceView, basename='service')
router.register(r'bookings', BookingView, basename='booking')

urlpatterns = router.urls