from django.test import TestCase
from rest_framework.test import APIClient
from rest_framework import status
from accounts.models import RegisterUserModel
from engineers.models import EngineerProfile

class EngineerViewSetTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.admin_user = RegisterUserModel.objects.create_superuser(
            username='admin_user',
            email='admin@test.com',
            password='adminpassword',
            role=RegisterUserModel.Role.ADMIN
        )
        self.client.force_authenticate(user=self.admin_user)

    def test_create_engineer_success(self):
        data = {
            'username': 'engineer1',
            'email': 'engineer1@example.com',
            'phone_number': '1234567890',
            'password': 'engineerpassword123',
            'professional_title': 'Senior Service Technician',
            'specialization': 'Electrical',
            'experience': 5
        }
        response = self.client.post('/engineers/create/', data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data['message'], 'Engineer created successfully')
        self.assertEqual(response.data['data']['username'], 'engineer1')
        self.assertEqual(response.data['data']['email'], 'engineer1@example.com')
        self.assertEqual(response.data['data']['professional_title'], 'Senior Service Technician')

        engineer_profile = EngineerProfile.objects.get(user__username='engineer1')
        self.assertEqual(engineer_profile.experience, 5)

    def test_create_engineer_duplicate_username(self):
        data = {
            'username': 'engineer1',
            'email': 'engineer1@example.com',
            'phone_number': '1234567890',
            'password': 'engineerpassword123',
            'professional_title': 'Senior Service Technician',
            'specialization': 'Electrical',
            'experience': 5
        }
        response1 = self.client.post('/engineers/create/', data, format='json')
        self.assertEqual(response1.status_code, status.HTTP_201_CREATED)

        response2 = self.client.post('/engineers/create/', data, format='json')
        self.assertEqual(response2.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('username', response2.data)


