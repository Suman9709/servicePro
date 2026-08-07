from django.urls import path
from .views import  ProfileView, RegisterUserView, MyTokenObtainPairView, UserListView, Logout
from rest_framework_simplejwt.views import ( TokenRefreshView)
from rest_framework import routers

router = routers.DefaultRouter()

router.register(r'users', UserListView, basename='user')


urlpatterns = [
    path('register/', RegisterUserView.as_view(), name='register'), 
    path('login/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'), # login
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', Logout.as_view(), name='logout'), # logout
    path('profile/', ProfileView.as_view(), name='profile'), # get profile
    
]

urlpatterns += router.urls