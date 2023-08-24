from django.urls import path,include
from . import views

urlpatterns = [
    path('',views.home,name='home-blog'),
    path('Search',views.productSearching),
    path('Login',views.login),
    path('API/carousel',views.getCardData),
    path('API/productSearch',views.searchForProduct),
    path('API/Registration', views.registerUser),
    path('API/Login', views.searchForUser),
    path('API/addProduct', views.searchForUser),
]