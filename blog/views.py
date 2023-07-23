from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.
def home(request):
    return render(request,'home.html')

def productSearching(request):
    return render(request,'productSearching.html')