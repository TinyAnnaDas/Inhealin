from django.urls import path

from .views import UserDetailsView, UserCreateView, UserDeleteView, UserUpdateView


urlpatterns = [
    path('all-clients', UserDetailsView.as_view()),
    path('create', UserCreateView.as_view()),
    path('delete/<int:user_id>', UserDeleteView.as_view()),
    path('update/<int:user_id>', UserUpdateView.as_view()),
   
   

]