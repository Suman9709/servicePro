

from rest_framework.routers import DefaultRouter

from dashboard.views import GetAllCustomersList, GetAllEngineersList, GetAllServiceCategoriesList, GetAllServiceRequestsList

router = DefaultRouter()

router.register(r'engineers', GetAllEngineersList, basename='engineers')
router.register(r'customers', GetAllCustomersList, basename='customers')
router.register(r'service-requests', GetAllServiceRequestsList, basename='service-requests')
router.register(r'service-categories', GetAllServiceCategoriesList, basename='service-categories')


urlpatterns = router.urls