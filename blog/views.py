import json
from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from django.contrib.auth.models import User

ImgsRootPath = "../static/images/"

# Create your views here.
def home(request):
    return render(request,'home.html')

def productSearching(request):
    return render(request,'productSearching.html')

def login(request):
    return render(request,'login.html')

@api_view(['GET'])
def getCardData(request):
    card =  [
    [ImgsRootPath+"pizza.jpg", "Pizza Margarrito", "Magda Gessler poleca"],
    [ImgsRootPath+"cookie.jpg", "Ciasteczko", "Pyszne ciasteczko. Prosto z pieca"],
    [ImgsRootPath+"apple.jpg", "Jabłko", "Owoc pełen witamin"]
    ]
    return Response(card)
@api_view(['POST'])
def searchForProduct(request):
    body = request.body
    data = {}
    try:
        data=json.loads(body)
    except:
        pass
    
    return JsonResponse()

@api_view(['POST'])
def SearchForUser(request):
    if (request.method=='POST'):
        params = request.POST
        user = authenticate(username=request.POST.get('input-login',False),password=request.POST.get('input-password',False))
        if user is not None:
            return Response("OK")
        else:
            return Response("Bad password or username "+str(request.POST.get('input-login',False))+" "+str(request.POST.get('input-password',False)))
            
    
@api_view(['POST'])
def RegisterUser(request):
    if(request.method=='POST'):
        params = request.POST
        user = User.objects.create_user(request.POST.get('username',False), request.POST.get('email',False), request.POST.get('password',False))
        user.save()
