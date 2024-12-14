from django.contrib import admin
from .models import Note, Profile, Pets, ScheduledServices
# Register your models here.

admin.site.register(Note)
admin.site.register(Profile)
admin.site.register(Pets)
admin.site.register(ScheduledServices)
