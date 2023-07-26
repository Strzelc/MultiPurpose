from django.db import models

# Create your models here.
class Card(models.Model):
    imageSrc = models.CharField(max_length=30)
    cardTitle = models.CharField(max_length=30)
    cardText = models.CharField(max_length=30)