from django.urls import path,include
from . import views

urlpatterns = [
    path('',views.home,name='home-blog'),
    path('Search',views.productSearching),
    path('Login',views.login),
]