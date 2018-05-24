from django.db import models
from django.contrib.auth.models import AbstractUser

from localflavor.generic.models import IBANField
from localflavor.generic.countries.sepa import IBAN_SEPA_COUNTRIES


class User(AbstractUser):
    iban = IBANField(include_countries=IBAN_SEPA_COUNTRIES, blank=True, null=True)
    creator = models.ForeignKey('User', related_name="created", on_delete=models.CASCADE, blank=True, null=True)
