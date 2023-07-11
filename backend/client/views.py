from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from .serializers import CreateClientSerializer,ClientSerializer, MoodJournalSerializer, TherapySessionsSerializer
from rest_framework.generics import GenericAPIView
# Client = get_user_model()
from rest_framework.mixins import ListModelMixin, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin


from cadmin.serializers import SubsriptionSerializer
from cadmin.models import SubscriptionPlans
from therapist.models import Therapist, TherapistAvailability
from .models import ClientAdditionalDetails, MoodJournal, TherapySessions
from django.db.models import Q

from therapist.serializers import TherapistSerializer

class RetrieveUpcomingSubscriptionClient(APIView):
     permission_classes = [permissions.IsAuthenticated]
     def get(self, request):
        user = request.user
        upcoming_therapy_session = TherapySessions.objects.filter(client=user.id).last()
        if upcoming_therapy_session:
            session_serializer = TherapySessionsSerializer(upcoming_therapy_session)
            therapist = upcoming_therapy_session.therapist
            therapist_serializer = TherapistSerializer(therapist)

            response_data = {
                'session': session_serializer.data,
                'therapist': therapist_serializer.data
            }
        else:
            return Response("Message : No Session", status=status.HTTP_200_OK)
      

        return Response(response_data, status=status.HTTP_200_OK)





class LCTherapySessionAPI(GenericAPIView, ListModelMixin, CreateModelMixin):
    permission_classes = [permissions.IsAuthenticated]
    
    queryset = TherapySessions.objects.all()
    serializer_class = TherapySessionsSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        scheduled_time = request.data.get('scheduled_time')
        print(scheduled_time)
        availability = TherapistAvailability.objects.filter(date_time=scheduled_time).first()
        availability.session_booked = True
        availability.save()
        return self.create(request, *args, **kwargs)

class UpdateTherapySessionAPI(APIView):
    permission_classes = [permissions.IsAuthenticated]
    def put(self, request, id):
        therapist_id = request.data['therapist']
        therapy_session = TherapySessions.objects.filter(id=id).first()
        if therapy_session:
            therapist = Therapist.objects.get(id=therapist_id)
            therapy_session.therapist = therapist
            serializer = TherapySessionsSerializer(therapy_session, data=request.data, partial=True)

        # serializer = TherapySessionsSerializer(therapy_session, data={'therapist': therapist_id}, partial=True)

            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data, status=status.HTTP_200_OK)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        else:
            return Response({'error': 'Therapy session not found.'}, status=status.HTTP_404_NOT_FOUND)

class DeleteTherapySessionAPI(GenericAPIView, DestroyModelMixin):
    permission_classes = [permissions.IsAuthenticated]
    queryset = TherapySessions.objects.all()
    serializer_class = TherapySessionsSerializer

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)

   





class RTherapySessiosTherapistAPI(APIView):
    def get(self, request, pk):
        therapy_sessions = TherapySessions.objects.filter(therapist=pk)

        clients = []

        for therapy_session in therapy_sessions:
           clients.append(therapy_session.client)
        

        serializer = ClientSerializer(clients, many=True)
       

        # print(serializer.data)
        return Response(serializer.data, status=status.HTTP_200_OK)


class RTherapySessiosClientAPI(APIView):
    def get(self, request, pk):
        therapy_sessions = TherapySessions.objects.filter(client=pk)
        print(therapy_sessions)
        

        therapists = []
        for therapy_session in therapy_sessions:
           therapists.append(therapy_session.therapist)

        # print(therapists)

        serializer = TherapistSerializer(therapists, many=True)
        # print(serializer.data)
        
        return Response(serializer.data, status=status.HTTP_200_OK)




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
            print(subscription)
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




