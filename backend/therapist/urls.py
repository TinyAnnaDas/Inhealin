
from django.urls import path
from .views import RetrievePreSignedUrlView, RegisterTherapistView

urlpatterns = [
     path('pre-signed-url/', RetrievePreSignedUrlView.as_view()),
      path('register-therapist/', RegisterTherapistView.as_view()),

]