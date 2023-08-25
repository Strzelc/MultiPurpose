import json
from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from .forms import ProductSearchForm
from .models import Product

ImgsRootPath = "../static/images/"

# Create your views here.
def home(request):
    return render(request,'home.html')

def productSearching(request):
    return render(request,'productSearching.html')

def login(request):
    return render(request,'login.html')
