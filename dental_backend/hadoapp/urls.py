from django.urls import path
from .views import UserCreateView, DentistListView, PatientListView, AppointmentListView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('register/', UserCreateView.as_view(), name='register'),
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('dentists/', DentistListView.as_view(), name='dentist-list'),
    path('patients/', PatientListView.as_view(), name='patient-list'),
    path('appointments/', AppointmentListView.as_view(), name='appointment-list'),
]
