

from rest_framework.permissions import BasePermission

from .models import RegisterUserModel
    
class IsAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and (request.user.role == RegisterUserModel.Role.ADMIN or request.user.is_staff)
    
class IsEngineer(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == RegisterUserModel.Role.ENGINEER
class IsCustomer(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == RegisterUserModel.Role.CUSTOMER