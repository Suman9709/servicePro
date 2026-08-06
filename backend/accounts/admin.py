from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import RegisterUserModel


@admin.register(RegisterUserModel)
class RegisterUserModelAdmin(UserAdmin):
    model = RegisterUserModel
    fieldsets = UserAdmin.fieldsets + (
        ('Additional Info', {'fields': ('phone_number', 'role')}),
    )
    add_fieldsets = UserAdmin.add_fieldsets + (
        ('Additional Info', {'fields': ('email', 'phone_number', 'role')}),
    )
    list_display = ['username', 'email', 'phone_number', 'role', 'is_staff', 'is_superuser']
