from django.db import models

# Create your models here.
class Card(models.Model):
    image_source = models.CharField(max_length=30)
    card_title = models.CharField(max_length=30)
    card_text = models.CharField(max_length=30)

class User(models.Model):
    id_user=models.BigAutoField(primary_key=True)
    login = models.TextField()
    password = models.TextField()
    #history = models.ManyToManyField()

class Product(models.Model):
    id_product=models.BigAutoField(primary_key=True)
    name=models.TextField()
    description=models.TextField()
    image_source=models.TextField()
    price=models.IntegerField()
