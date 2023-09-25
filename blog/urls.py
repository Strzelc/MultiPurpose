from django.urls import path,include
from . import views

urlpatterns = [
    path('',views.home,name='home-blog'),
    path('search',views.productSearching),
    path('login',views.login),
    path('register',views.register),
]