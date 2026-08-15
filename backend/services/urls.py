from django.urls import path
from rest_framework.routers import DefaultRouter
from engineers.views import CustomerServiceHistoryView
from services.views import CategoryView, DeleteServicerequest, ServiceRequestView, ServiceView, CreateServiceRequestView

router = DefaultRouter()

router.register(r'categories', CategoryView, basename='category')
router.register(r'allservices', ServiceView, basename='service')
router.register(r'service-requests', ServiceRequestView, basename='allbooking')
# router.register(r'bookings', CreateServiceRequestView, basename='booking')

urlpatterns =[
    path('bookings/', CreateServiceRequestView.as_view(), name='create-service-request'), # for booking the service
    path('bookings/<int:id>/delete/', DeleteServicerequest.as_view(), name='delete-service-request'),
    path('customer-service-requests/', CustomerServiceHistoryView.as_view(), name='customer-service-history'),
]+ router.urls