from django.urls import path
from .views import RegisterClientView,RetrieveClientView, RetrieveSubscriptionDetails,MoodJoural

urlpatterns = [
    path('register', RegisterClientView.as_view()),
    path('me', RetrieveClientView.as_view()),
    path('retrieve-subscription/', RetrieveSubscriptionDetails.as_view()),
    path('mood-journal/', MoodJoural.as_view()),

]