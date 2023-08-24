from django import forms

class ProductSearchForm(forms.Form):
    productName = forms.CharField(label="input-product-name", max_length=100)

class ProductAdd(forms.Form):
    name  = forms.CharField(label="input-product-name", max_length=100)
    description  = forms.CharField(label="input-product-description", max_length=300)
    price  = forms.FloatField(label="input-product-price")
    imageSource  = forms.CharField(label="input-product-image-source", max_length=100)