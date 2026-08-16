
from django.urls import path
from rest_framework.routers import DefaultRouter


from engineers.views import  EngineerCreateView, EngineerDetailView, EngineerListView, EngineerProfileDeleteView, EngineerProfileUpdateView, EngineerProfileView,EngineerGetAllService

router = DefaultRouter();

router.register(r'engineer-service-requests', EngineerGetAllService, basename="engineer-service-requests" )

urlpatterns = [
    path('create/', EngineerCreateView.as_view(), name='create_engineer'),
    path('all/', EngineerListView.as_view(), name='list_engineers'),
    path('detail/<int:pk>/', EngineerDetailView.as_view(), name='engineer_detail'),
    path('profile/', EngineerProfileView.as_view(), name='engineer_profile'),
    path('profile/update/<int:pk>/', EngineerProfileUpdateView.as_view(), name='engineer_profile_update'),
    path('profile/delete/<int:pk>/', EngineerProfileDeleteView.as_view(), name='engineer_profile_delete'),
    
]

urlpatterns+=router.urls
