from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    iban = models.CharField(max_length=30, blank=True)
    creator = models.ForeignKey('User', related_name="created", blank=False, null=False)
