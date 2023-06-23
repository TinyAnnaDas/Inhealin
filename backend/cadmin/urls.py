from django.urls import path

from .views import   ListTherapistAPI, RUDTherapistAPI, ListClientAPI, RUDClientAPI, LCSubscriptionAPI, RUDSubscriptionAPI


urlpatterns = [
    path('list-all-clients/', ListClientAPI.as_view()),
    path('retreive-update-delete-client/<int:pk>/', RUDClientAPI.as_view()),

    path('list-all-therapists/', ListTherapistAPI.as_view()),
    path('retreive-update-delete-therapist/<int:pk>/', RUDTherapistAPI.as_view()),

   

    path('list-create-subscription-plans/', LCSubscriptionAPI.as_view(), name="all_subscriptions"),
    path('retreive-update-delete-subscription-plans/<int:pk>/', RUDSubscriptionAPI.as_view() ),
    
   
   

]