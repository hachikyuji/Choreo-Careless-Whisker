from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Note, Profile, Pets, ScheduledServices, Notifications

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}
        
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['first_name', 'last_name', 'middle_initial', 'mobile_no', 'email', 'user_id', 'onboarding_complete']
        read_only_fields = ['onboarding_complete']
        
    def update(self, instance, validated_data):
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.middle_initial = validated_data.get('middle_initial', instance.middle_initial)
        instance.mobile_no = validated_data.get('mobile_no', instance.mobile_no)
        instance.email = validated_data.get('email', instance.email)
        
        instance.onboarding_complete = True
        instance.save()
        return instance

class PetsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pets
        fields = '__all__'
        read_only_fields = ['user']
        
    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        return instance
        
class ScheduleServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = ScheduledServices
        fields = [
            "id", "user_id", "pet_name", "service", "scheduled_date", "scheduled_time", "end_time", "cancelled",
        ]
        
        read_only_fields = ["user"]
        
class PetNamesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pets
        fields = ['id', 'pet_name']
        
class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notifications
        fields = [
            "id", "user_id", "message", "created_at", "title"
        ]
        


