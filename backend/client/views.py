from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .serializers import CreateClientSerializer,ClientSerializer, MoodJournalSerializer
# Client = get_user_model()

from cadmin.serializers import SubsriptionSerializer
from cadmin.models import SubscriptionPlans
from .models import ClientAdditionalDetails, MoodJournal

class RegisterClientView(APIView):
    def post(self, request):
        data = request.data
 
        
        
        serializer = CreateClientSerializer(data=data)
        
        print(serializer)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        client = serializer.create(serializer.validated_data)
        client = ClientSerializer(client)
        return Response(client.data, status.HTTP_201_CREATED)


class RetrieveClientView(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def get(self, request):
        user = request.user
        user = ClientSerializer(user)
       
        return Response(user.data, status=status.HTTP_200_OK)


class RetrieveSubscriptionDetails(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        client = request.user

        try:
            client_additional_details = ClientAdditionalDetails.objects.get(client=client)
        except:
            return Response("", status=status.HTTP_200_OK)
        
        if client_additional_details.subscription is not None:
            subscription = client_additional_details.subscription
            # print(subscription)
        else:
            return Response("", status=status.HTTP_200_OK)


        serializer = SubsriptionSerializer(subscription)

        serialized_data = serializer.data
        # print(serialized_data)

        return Response(serialized_data, status=status.HTTP_200_OK)


class MoodJoural(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        client = request.user
        print(client)
        print(request.data.get("journal_data"))

        journal_data = request.data.get("journal_data")
        date = request.data.get("created_at")
        

        serializer = MoodJournalSerializer(data={
            "journal":journal_data,
            "client": client.id,
            "updated_at":date
        })

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        serializer.save()

        
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request):
        print(request.data)
        journal_id = request.data["journal_id"]
        updated_journal_data = request.data["journal_data"]

        journal_to_be_updated = MoodJournal.objects.get(id=journal_id)
        journal_to_be_updated.journal = updated_journal_data
        journal_to_be_updated.save()
       
        return Response({"message":"success"}, status=status.HTTP_200_OK)
        

    def get(self, request):

        journals = MoodJournal.objects.all().order_by("-updated_at")
        journals = MoodJournalSerializer(journals, many=True)
        return Response(journals.data, status=status.HTTP_200_OK)
    
    def delete(self, request):
        journal_id = request.GET.get('delete_journal')
        print(journal_id)
        journal = MoodJournal.objects.get(id=journal_id)
        journal.delete()

        return Response({"message":"success"}, status=status.HTTP_200_OK)




