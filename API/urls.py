from django.urls import path,include
from . import views
urlpatterns = [
    path('carousel',views.getCardData),
    path('product-search',views.searchForProduct),
    path('registration', views.registerUser),
    path('login', views.searchForUser),
    path('add-product', views.addProduct),
]