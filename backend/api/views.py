from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics, viewsets, permissions
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Note, Profile, Pets, ScheduledServices, Notifications
from .serializers import UserSerializer, ProfileSerializer, PetsSerializer, ScheduleServiceSerializer, PetNamesSerializer, NotificationSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.core.mail import send_mail
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer
from django.http import JsonResponse
from django.views import View
import logging

# Create your views here.

logger = logging.getLogger(__name__)

class CreateUserView(generics.CreateAPIView):
    query = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    
class OnboardingStatusView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        profile = Profile.objects.get(user=request.user)
        return Response({"onboarding_complete": profile.onboarding_complete})
    
class ProfileUpdateView(generics.RetrieveUpdateAPIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]
    
    def get_object(self):
        return Profile.objects.get(user=self.request.user)
    
    def perform_update(self, serializer):
        serializer.save()
        
class PetRegisterView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request):
        serializer = PetsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
        
class UserPetsView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        user = request.user
        pets = Pets.objects.filter(user=user)
        serializer = PetsSerializer(pets, many=True)
        return Response(serializer.data)
    
class ScheduleServicesView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = ScheduleServiceSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
     
class PetNamesView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        user = request.user
        pets = Pets.objects.filter(user=user)
        serializer = PetNamesSerializer(pets, many=True)
        return Response(serializer.data)
    
class AccessScheduledServicesView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        user = request.user
        services = ScheduledServices.objects.filter(user=user)
        serializer = ScheduleServiceSerializer(services, many=True)
        return Response(serializer.data)

class AccountTypeView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get (self, request):
        profile = Profile.objects.get(user=request.user)
        return Response({'account_type': profile.account_type})
    
class AdminAccessScheduledServicesView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        scheduled_services = ScheduledServices.objects.filter(status=False)
        serializer = ScheduleServiceSerializer(scheduled_services, many=True)
        return Response(serializer.data)

class UpdateServiceStatusView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, service_id, user_id, action):
        try:
            service = ScheduledServices.objects.get(id=service_id)
            profile = Profile.objects.get(user_id=service.user_id)
            
            user_email = profile.email
            
            if action == "accept":
                service.status = True
                service.save()

                send_mail(
                    "Appointment Accepted",
                    "Your appointment has been accepted.",
                    "carelesswhisker1453@gmail.com",
                    [user_email],
                    fail_silently=False,
                )
                
                notification = Notifications.objects.create(
                    user=profile.user,
                    title="Appointment Accepted",
                    message=f"Your appointment has been accepted.",            
                )
                return Response({"message": "Service accepted, and email sent."}, status=status.HTTP_200_OK)

            elif action == "reject":
                service.status = None
                service.save()
                
                send_mail(
                    "Appointment Rejected",
                    "Your appointment has been rejected.",
                    "carelesswhisker1453@gmail.com",
                    [user_email],
                    fail_silently=False,
                )
                
                Notifications.objects.create(
                    user=profile.user,
                    title="Appointment Rejected",
                    message="Your appointment has been rejected.",
                )
                
                return Response({"message": "Service rejected, and email sent."}, status=status.HTTP_200_OK)

            return Response({"error": "Invalid action."}, status=status.HTTP_400_BAD_REQUEST)

        except ScheduledServices.DoesNotExist:
            return Response({"error": "Service not found."}, status=status.HTTP_404_NOT_FOUND)

class AccessUpcomingScheduledServicesView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        user = request.user
        services = ScheduledServices.objects.filter(user=user, status=True, cancelled=False)
        serializer = ScheduleServiceSerializer(services, many=True)
        return Response(serializer.data)

class AdminAccessUpcomingScheduledServicesView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        scheduled_services = ScheduledServices.objects.filter(status=True, finished=False)
        serializer = ScheduleServiceSerializer(scheduled_services, many=True)
        return Response(serializer.data)

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        profiles = Profile.objects.all() 
        serializer = ProfileSerializer(profiles, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

class CancelAppointmentView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request, appointment_id):
        try:
            appointment = ScheduledServices.objects.get(id=appointment_id)
            if appointment.cancelled:
                return Response({"error": "Appointment already cancelled."}, status=status.HTTP_400_BAD_REQUEST)
            
            appointment.cancelled = True
            appointment.save()
            
            user_instance = Profile.objects.get(user_id=appointment.user_id)
            user = user_instance.user
            admin_email = "muringjohncarlo@gmail.com";
            
            notification = Notifications.objects.create(
                user=user,
                title="Appointment Cancelled",
                notif_type="admin",
                message=f"The appointment for pet: {appointment.pet_name} on {appointment.scheduled_date} has been cancelled by {user_instance.first_name} {user_instance.last_name}.",
            )
            
            send_mail(
                "Appointment Cancelled",
                f"The appointment for pet: {appointment.pet_name} on {appointment.scheduled_date} has been cancelled by {user_instance.first_name} {user_instance.last_name}.",
                "carelesswhisker1453@gmail.com",
                [admin_email],
                fail_silently=False,
            )
            
            return Response({"message": "Appointment cancelled, and email sent."}, status=status.HTTP_200_OK)
        
        except ScheduledServices.DoesNotExist:
            return Response({"error": "Appointment not found."}, status=status.HTTP_404_NOT_FOUND)
        
class AdminNotificationsView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            profile = Profile.objects.get(user=request.user)
            
            if profile.account_type != "admin":
                return Response({"notifications": [], "message": "No admin notifications available."}, status=status.HTTP_200_OK)
            
            notifications = Notifications.objects.filter(notif_type="admin", read=False).order_by("-created_at")
            
            serializer = NotificationSerializer(notifications, many=True)

            return Response(serializer.data, status=status.HTTP_200_OK)
        except Profile.DoesNotExist:
            return Response({"error": "Profile not found."}, status=status.HTTP_404_NOT_FOUND)

class UpdateAdminNotificationsView(APIView):
    permission_classes = [IsAuthenticated]
    
    def patch (self, request):
        try:
            notification_ids = request.data.get("notifications", [])
            
            if not notification_ids:
                logger.error("No notification IDs provided in the request.")
                return Response({"error": "No notification IDs provided."}, status=status.HTTP_400_BAD_REQUEST)
        
            notifications = Notifications.objects.filter(id__in=notification_ids)
            
            if not notifications.exists():
                logger.error(f"Notifications with IDs {notification_ids} not found.")
                return Response({"error": "No notifications found with the provided IDs."}, status=status.HTTP_404_NOT_FOUND)
            
            updated_count = notifications.update(read=True)
            
            if updated_count == 0:
                logger.error(f"No notifications were updated. Notification IDs: {notification_ids}")
                return Response({"error": "No notifications were updated."}, status=status.HTTP_400_BAD_REQUEST)
        
            return Response ({"message": "Notifications updated."}, status=status.HTTP_200_OK)
        
        except Exception as e:
            logger.error(f"Error updating notifications: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class UserNotificationView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        notifications = Notifications.objects.filter(user_id=request.user, read=False, notif_type__isnull=True,).order_by("-created_at")
            
        serializer = NotificationSerializer(notifications, many=True)
            
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class UpdateUserNotificationsView(APIView):
    permission_classes = [IsAuthenticated]
    
    def patch(self, request):
        try:
            notification_ids = request.data.get("Notifications:", [])
            
            if not notification_ids:
                logger.error("No notification IDs provided in the request.")
                return Response({"error": "No notification IDs provided."}, status=status.HTTP_400_BAD_REQUEST)
            
            notifications = Notifications.objects.filter(id__in=notification_ids)
            
            if not notifications.exists():
                logger.error(f"Notifications with IDs {notification_ids} not found.")
                return Response({"error": "No notifications found with the provided IDs."}, status=status.HTTP_404_NOT_FOUND)
            
            updated_count = notifications.update(read=True)
            
            if updated_count == 0:
                logger.error(f"No notifications were updated. Notification IDs: {notification_ids}")
                return Response({"error": "No notifications were updated."}, status=status.HTTP_400_BAD_REQUEST)
            
            return Response({"Message": "Notifications updated"}, status=status.HTTP_200_OK)
        
        except Exception as e:
            logger.error(f"Error updating notifications: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class AccessUnfinishedSchedulesView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            services = ScheduledServices.objects.filter(status=True, finished=False, cancelled=False)
            serializer = ScheduleServiceSerializer(services, many=True)
            return Response(serializer.data)
        except Exception as e:
            logger.error(f"Error accessing unfinished schedules: {str(e)}")
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class UpdatePetDetailsView(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pet_name):
        logging.debug(f"Request data: {request.data}")
        
        try:
            pet = Pets.objects.get(pet_name=pet_name)
        except Pets.DoesNotExist:
            return Response({"error": "Pet not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = PetsSerializer(pet, data=request.data, partial=True)

        if serializer.is_valid():
            updated_pet = serializer.save()
            logging.debug(f"Updated pet data: {updated_pet}")
            return Response(serializer.data, status=status.HTTP_200_OK)


        logging.debug(f"Current pet data: {pet}")
        logging.debug(f"Validated data before saving: {serializer.validated_data}")
        
        logging.debug(f"Serializer errors: {serializer.errors}")
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class AdminAccessRegisteredPetsView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        try:
            pets = Pets.objects.all()
            serializer = PetsSerializer(pets, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
class AdminAccessUserProfilesView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self):
        try:
            profiles = Profile.objects.all()
            serializer = ProfileSerializer(profiles, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
class AdminUpdateRegisteredPestView(APIView):
    permission_classes = [IsAuthenticated]
    
    def put(self, request, pet_name):
        pet = Pets.objects.get(pet_name=pet_name)
        serializer = PetsSerializer(pet, data=request.data, partial=True)
        
        if serializer.is_valid():
            updated_pet = serializer.save()
            logging.debug(f"Updated pet data: {updated_pet}")
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AdminUpdateProfileView(APIView):
    permission_classes = [IsAuthenticated]
    
    def put(self, request, first_name):
        profile = Profile.objects.get(first_name=first_name)
        serializer = ProfileSerializer(profile, data=request.data, partial=True)
        
        if serializer.is_valid():
            updated_profile = serializer.save()
            logging.debug(f"Updated pet data: {updated_profile}")
            return Response(serializer.data, status=status.HTTP_200_OK)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class HeaderUserProfileView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        user = request.user
        try:
            profile = Profile.objects.get(user=user)
            serializer = ProfileSerializer(profile)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except:
            return Response({"error": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)

class UpdateServiceFinishedView(APIView):
    permission_classes = [IsAuthenticated]
    
    def put(self, request, service_id):
        try:
            service = ScheduledServices.objects.get(id=service_id)
            
            service.finished = True
            service.save()
            
            Notifications.objects.create(
                user=service.user,
                title="Appointment Finished",
                message=f"Thank you for your patronage!",
            )
            return Response({"message" : "Service finished."})
        
        except ScheduledServices.DoesNotExist:
            return Response({"error": "Service not found"}, status=status.HTTP_404_NOT_FOUND)

class PromoteUserToAdmin(APIView):
    permission_classes = [AllowAny]
    
    def get (self, request, *args, **kwargs):
        hardcoded = "admin"
        
        try: 
            user = User.objects.get(username=hardcoded)
            profile = Profile.objects.get(user=user)
            profile.account_type = 'admin'
            profile.save()
            
            return Response({"message" : f"User {hardcoded} promoted to admin successfully."}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)
        except Profile.DoesNotExist:
            return Response({"error": "Profile not found"}, status=status.HTTP_404_NOT_FOUND)