from django.db import models

# Create your models here.
from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = (
        ('dentist', 'Dentist'),
        ('patient', 'Patient'),
    )
    role = models.CharField(max_length=10, choices=ROLE_CHOICES)

class Specialty(models.Model):
    # Example: "Orthodontics"
    NAME_CHOICES = (
        ('orthodontics', 'Orthodontics'),
        ('periodontics', 'Periodontics'),
        ('endodontics', 'Endodontics'),
        ('oral_surgery', 'Oral Surgery'),
        ('pediatric_dentistry', 'Pediatric Dentistry'),
        ('prosthodontics', 'Prosthodontics'),
        ('cosmetic_dentistry', 'Cosmetic Dentistry'),
        ('general_dentistry', 'General Dentistry'),
        ('dental_hygiene', 'Dental Hygiene'),
        ('oral_pathology', 'Oral Pathology'),
        ('public_health_dentistry', 'Public Health Dentistry'),
        ('dental_anesthesiology', 'Dental Anesthesiology'),
        ('maxillofacial_radiology', 'Maxillofacial Radiology'),
        ('sleep_dentistry', 'Sleep Dentistry'),
        ('forensic_dentistry', 'Forensic Dentistry'),
        ('geriatric_dentistry', 'Geriatric Dentistry'),
        ('sports_dentistry', 'Sports Dentistry'),
        ('holistic_dentistry', 'Holistic Dentistry'),
        ('laser_dentistry', 'Laser Dentistry'),
        ('dental_implants', 'Dental Implants'),
        ('tmj_disorders', 'TMJ Disorders'),
        ('oral_medicine', 'Oral Medicine'),
        ('dental_materials_science', 'Dental Materials Science'),
    )
    name = models.CharField(max_length=50, choices=NAME_CHOICES)
    

class Dentist(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="dentist_profile")
    specialties = models.ManyToManyField(Specialty)
    available_hours = models.JSONField(default=list)  # Example: [{"day": "Monday", "from": "09:00", "to": "12:00"}]

class Patient(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="patient_profile")
    treatments = models.TextField()  # Example: "Braces treatment ongoing"

class Appointment(models.Model):
    dentist = models.ForeignKey(Dentist, on_delete=models.CASCADE)
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE)
    date = models.DateTimeField()
