
from rest_framework.views import APIView
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import ListModelMixin, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin
from rest_framework.response import Response
from rest_framework import permissions, status

from .serializers import  SubsriptionSerializer, CreateSubscriptionSerializer, CreateClientAdditionalDetails, ChatSerializer
from client.serializers import ClientSerializer
from therapist.serializers import TherapistSerializer

from django.contrib.auth import get_user_model
User = get_user_model()
from .models import SubscriptionPlans, Group, Chat

from django.db.models import Q


class ListClientAPI(GenericAPIView, ListModelMixin):
    permission_classes = [permissions.IsAdminUser]

    queryset = User.objects.exclude(Q(is_superuser=True) | Q(type='THERAPIST'))
    serializer_class = ClientSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)



class RUDClientAPI(GenericAPIView, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin):
    queryset = User.objects.exclude(Q(is_superuser=True) | Q(type='THERAPIST'))
    serializer_class = ClientSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)




class ListTherapistAPI(GenericAPIView, ListModelMixin):
    permission_classes = [permissions.IsAdminUser] # commenting 

    queryset = User.objects.exclude(Q(is_superuser=True) | Q(type='CLIENT')).order_by('created_at')
    serializer_class = TherapistSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class RUDTherapistAPI(GenericAPIView, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin):
    # permission_classes = [permissions.IsAdminUser]

    queryset = User.objects.exclude(Q(is_superuser=True) | Q(type='CLIENT'))
    serializer_class = TherapistSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)





class LCSubscriptionAPI(GenericAPIView, ListModelMixin, CreateModelMixin):
    
    permission_classes = [permissions.IsAdminUser]

    queryset = SubscriptionPlans.objects.all()
    serializer_class = SubsriptionSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

class ListSubscriptionAPI(GenericAPIView, ListModelMixin): # writing it seperately since, it is needed in the front-end without any permissions
    queryset = SubscriptionPlans.objects.all().order_by('id')
    serializer_class = SubsriptionSerializer
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class RUDSubscriptionAPI(GenericAPIView, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin):
    permission_classes = [permissions.IsAdminUser]

    queryset = SubscriptionPlans.objects.all()
    serializer_class = SubsriptionSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

class RetrieveSubscription(GenericAPIView, RetrieveModelMixin):
    queryset = SubscriptionPlans.objects.all()
    serializer_class = SubsriptionSerializer

    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)













# class TherapistsDetailsView(APIView):
#     permission_classes = [permissions.IsAdminUser]
#     def get(self, request):
#         therapist = User.objects.exclude(Q(is_superuser=True) | Q(type='CLIENT'))
     
#         therapist = TherapistSerializer(therapist, many=True)

#         return Response(therapist.data, status = status.HTTP_200_OK)






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










