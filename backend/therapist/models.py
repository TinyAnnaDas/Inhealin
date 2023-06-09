from django.db import models

# Create your models here.

from client.models import User, UserAccountManager
from django.contrib.postgres.fields import ArrayField


class TherapistManager(UserAccountManager):
    def get_queryset(self, *args, **kwargs):
        return super().get_queryset(*args, **kwargs).filter(type=User.Types.THERAPIST)


class Therapist(User):
    objects = TherapistManager()

    class Meta:
        proxy = True

    def save(self, *args, **kwargs):
        if not self.pk:
            self.type = User.Types.THERAPIST
        return super().save(*args, **kwargs)


class TherapistAdditionalDetails(models.Model):
    therapist = models.OneToOneField(
        Therapist, 
        on_delete=models.CASCADE,
        null=True, 
        blank=True
        )
    age = models.CharField(max_length=10, null=True, blank=True)
    gender = models.CharField(max_length=10, null=True, blank=True)
    qualification = models.CharField(max_length=50, null=True, blank=True)
    experience = models.CharField(max_length=50, null=True, blank=True)
    hoursPerWeek = models.CharField(max_length=20, null=True, blank=True)

    specialization = ArrayField(models.CharField(max_length=50, null=True, blank=True))
    technique = ArrayField(models.CharField(max_length=50, null=True, blank=True))

    describeYourSelf = models.CharField(max_length=1000, null=True, blank=True)

    fluency = ArrayField(models.CharField(max_length=50, null=True, blank=True))

    chat2to3TimesADay = models.CharField(max_length=10, null=True, blank=True)
    sessionPreferredTime = models.CharField(max_length=20, null=True, blank=True)
    resume = models.CharField(max_length=500, null=True, blank=True)

    PENDING = 'pending'
    ON_PROCESS = 'on-process'
    APPROVED = 'approved'

    STATUS_CHOICES = [
        (PENDING, 'Pending'), 
        (ON_PROCESS, 'On Process'),
        (APPROVED, 'Approved')
    ]

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default=PENDING)
   
