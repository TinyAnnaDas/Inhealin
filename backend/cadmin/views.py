
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import permissions, status

from .serializers import AdminUserCreateSerializer, SubsriptionSerializer, CreateSubscriptionSerializer, CreateClientAdditionalDetails, ChatSerializer
from client.serializers import ClientSerializer
from therapist.serializers import TherapistSerializer

from django.contrib.auth import get_user_model
User = get_user_model()
from .models import SubscriptionPlans, Group, Chat

from django.db.models import Q



class UserDetailsView(APIView):
    permission_classes = [permissions.IsAdminUser]
    def get(self, request):
        user = User.objects.exclude(Q(is_superuser=True) | Q(type='THERAPIST'))
     
        user = ClientSerializer(user, many=True)

        return Response(user.data, status = status.HTTP_200_OK)

class UserCreateView(APIView):
    permission_classes = [permissions.IsAdminUser]
    def post(self, request):
        data = request.data

        serializer = AdminUserCreateSerializer(data=data)
        if not serializer.is_valid():
            return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
        
        user = serializer.create(serializer.validated_data)
        user = ClientSerializer(user)

        return Response(user.data, status = status.HTTP_201_CREATED)

class UserDeleteView(APIView):
    permission_classes = [permissions.IsAdminUser]
    def get(self, request, user_id):
        user = User.objects.get(id = user_id)
        user.delete()
        return Response({"message": "success"}, status = status.HTTP_200_OK)


class UserUpdateView(APIView):
    permission_classes = [permissions.IsAdminUser]
    def post(self, request, user_id):
        user = User.objects.get(id = user_id)
        user.first_name = request.data['first_name']
        user.last_name = request.data['last_name']
        user.email = request.data['email']
        user.save()
        return Response({"message": "success"}, status = status.HTTP_200_OK)


class AllSubscriptionView(APIView):
    def get(self, request):

        subscription = SubscriptionPlans.objects.all()
        subscription = SubsriptionSerializer(subscription, many=True)
        # print(subscription)

        return Response(subscription.data, status=status.HTTP_200_OK)

class SubscriptionDetails(APIView):
    def get(self, request, id):
        selected_subscription = SubscriptionPlans.objects.get(id=id)
        selected_subscription = SubsriptionSerializer(selected_subscription)

        return Response(selected_subscription.data, status=status.HTTP_200_OK)


# data=request.data - This line extracts the data from the request object. 
# In DRF, this is a dictionary-like object containing the request payload data.


class TherapistsDetailsView(APIView):
    permission_classes = [permissions.IsAdminUser]
    def get(self, request):
        therapist = User.objects.exclude(Q(is_superuser=True) | Q(type='CLIENT'))
     
        therapist = TherapistSerializer(therapist, many=True)

        return Response(therapist.data, status = status.HTTP_200_OK)






class ProcessOrder(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def post(self, request):
        # print(request.data)
        subscription_id = request.data['subscriptionPlanId']
        subscription = SubscriptionPlans.objects.get(id=subscription_id)
        # print(subscription)
        client = request.user

        serializer = CreateClientAdditionalDetails(data={
            "client": client.id,
            "subscription": subscription_id

        })

        if not serializer.is_valid():
            return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

        serializer.save()
        


        payment_id = request.data['paymentId']

        serializer = CreateSubscriptionSerializer(data={
            "subscription_plan": subscription_id,
            "client": client.id,
            "payment_id": payment_id
            })

        if not serializer.is_valid():
            return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

        serializer.save()
       
        return Response(serializer.data, status=status.HTTP_200_OK)

class RetriveChat(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request, group_name):

        group = Group.objects.filter(name=group_name).first()
        if group:
            chats = Chat.objects.filter(group=group)
            chats = ChatSerializer(chats, many=True)
        else:
            group = Group(name=group_name)
            group.save()
        
        print(group_name)

        return Response(chats.data, status=status.HTTP_200_OK)










