from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from blog.forms import ProductSearchForm
from blog.models import Product
import json
from common.utilities import checkEmailSpelling, checkPasswordSpelling

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
        form = ProductSearchForm(json.loads(request.body))
        foundProducts = Product.objects.filter(name__contains=form.data['input-product-name'])
        productsData={"name":[],"description":[],"image_source":[]}
        for product in foundProducts:
            productsData["image_source"].append(ImgsRootPath+product.image_source)
            productsData["name"].append(product.name)
            productsData["description"].append(product.description)
        print("resp: \n"+str(productsData))  
        print("\n session id: "+str(request.session)  )
        return Response(productsData)
    else:
        return Response()

@api_view(['POST'])
def addProduct(request):
    if (request.method=='POST'):
        form = ProductSearchForm(request.POST)
        #input-product-
        newRecord=Product(name=form.data['input-product-name'],description=form.data['input-product-description'],price=form.data['input-product-price'],image_source=form.data['input-product-image-source'])
        newRecord.save()
    return HttpResponseRedirect("../blog/search")

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
        #validation
        #try:
        print(params)
        print(len(params["login"]))
        print(len(params["password"]))
        print(len(params["email"]))
        if(len(params["login"])>2 and checkPasswordSpelling(password=params["password"], userType="Client") and checkEmailSpelling(params["email"])):
                duplicateUser = User.objects.filter(username=params["login"]).get()
                if(duplicateUser is None):
                    duplicateUser = User.objects.filter(email=params["email"]).get()
                    if(duplicateUser is None):
                        user = User.objects.create_user(params["login"], params["email"], params["password"])
                        user.save()
                        return Response("OK") 
                    else:
                        return Response("There is already user with that email") 
                else:
                    return Response("Username is occupied")
        else:
            return Response("Credentials don't meet the requirements")
        #except:
            #return Response("Error. Bad request")
        
    else:
        return Response("Bad request")
