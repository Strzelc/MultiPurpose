from django.urls import path,include
from . import views
urlpatterns = [
    path('carousel',views.getCardData),
    path('productSearch',views.searchForProduct),
    path('Registration', views.registerUser),
    path('Login', views.searchForUser),
    path('addProduct', views.searchForUser),
]