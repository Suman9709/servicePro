
from django.urls import path

from engineers.views import EngineerDetailView, EngineerListView, EngineerProfileViewSet, EngineerViewSet


urlpatterns = [
    path('create/', EngineerViewSet.as_view(), name='create_engineer'),
    path('all/', EngineerListView.as_view(), name='list_engineers'),
    path('detail/<int:pk>/', EngineerDetailView.as_view(), name='engineer_detail'),
    path('profile/', EngineerProfileViewSet.as_view(), name='engineer_profile')
]
