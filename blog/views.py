from django.shortcuts import render
from django.http import HttpResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view

ImgsRootPath = "../static/images/"

# Create your views here.
def home(request):
    return render(request,'home.html')

def productSearching(request):
    return render(request,'productSearching.html')

def login(request):
    return render(request,'login.html')

@api_view(['GET'])
def GetCardData(request):
    card =  [
    [ImgsRootPath+"pizza.jpg", "Pizza Margarrito", "Magda Gessler poleca"],
    [ImgsRootPath+"cookie.jpg", "Ciasteczko", "Pyszne ciasteczko. Prosto z pieca"],
    [ImgsRootPath+"apple.jpg", "Jabłko", "Owoc pełen witamin"]
    ]
    return Response(card)