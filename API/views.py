from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from blog.forms import ProductSearchForm
from blog.models import Product

ImgsRootPath = "../static/images/"

# Create your views here.


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
    if (request.method=='POST'):
        form = ProductSearchForm(request.POST)
    return Response(str(form.data['input-product-name']))

@api_view(['POST'])
def addProduct(request):
    if (request.method=='POST'):
        form = ProductSearchForm(request.POST)
        #input-product-
        newRecord=Product(name=form.data['input-product-name'],description=form.data['input-product-description'],price=form.data['input-product-price'],image_source=form.data['input-product-image-source'])
        newRecord.save()
    return HttpResponseRedirect("../blog/Search")

@api_view(['POST'])
def searchForUser(request):
    if (request.method=='POST'):
        params = request.POST
        user = authenticate(username=request.POST.get('input-login',False),password=request.POST.get('input-password',False))
        if user is not None:
            return Response("OK")
        else:
            return Response("Bad password or username. Login: "+str(request.POST.get('input-login',False))+" , Password: "+str(request.POST.get('input-password',False)))
            
    
@api_view(['POST'])
def registerUser(request):
    if(request.method=='POST'):
        params = request.POST
        user = User.objects.create_user(request.POST.get('username',False), request.POST.get('email',False), request.POST.get('password',False))
        user.save()
        return Response("OK")
    else:
        return Response("Bad request")
