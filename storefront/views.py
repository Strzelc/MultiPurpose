from django.http import HttpResponseRedirect
from django.shortcuts import render

# Create your views here.
def home(request):
    return HttpResponseRedirect("../blog/")