# from django.shortcuts import render

# # Create your views here.
from rest_framework.generics import GenericAPIView
from rest_framework.mixins import ListModelMixin, CreateModelMixin, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin
from .models import TherapistAdditionalDetails, Therapist, TherapistAvailability

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from  inhealin import s3
import json
from .serializers import TherapistAdditionalDetailsSerializer, CreateTherapistSerializer, TherapistSerializer, TherapistAvailabilitySerializer



class ListAllApprovedTherapists(GenericAPIView, ListModelMixin):
    queryset = Therapist.objects.filter(status='approved')
    serializer_class = TherapistSerializer

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class RetrieveTheapistAdditionalDetailsAPI(APIView):
     def get(self, request, pk):
        theapist_additional_details = TherapistAdditionalDetails.objects.filter(therapist=pk).first()
        print(theapist_additional_details)
        serializer = TherapistAdditionalDetailsSerializer(theapist_additional_details)

        # print(serializer.data)

        return Response(serializer.data, status=status.HTTP_200_OK)




class ListTherapistAdditionalDetailsAPI(GenericAPIView, ListModelMixin):
    serializer_class = TherapistAdditionalDetailsSerializer
    queryset = TherapistAdditionalDetails.objects.filter(
    therapist__status='approved'
    )
    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class RetrievePreSignedUrlView(APIView):
    def get(self, request):
        url = s3.create_presigned_url()
        # print(url)
        return Response(url, status = status.HTTP_200_OK)

class RegisterTherapistView(APIView):
    def post(self, request):
        # print(request.data)
        name = request.data['name'] 
       
        email = request.data['email'] 
       
        phone = request.data['phone'] 
       
        password = request.data['password'] 

        serializer = CreateTherapistSerializer(data={
            "name":name,
            "email": email,
            "phone":phone,
            "password":password
        })

        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        therapist = serializer.create(serializer.validated_data)
        # print(therapist)
        specialization = request.data['specialization'] 
        specializations = specialization.split(',')
        # print(specializations)

        technique = request.data['technique']
        techniques = technique.split(',')
        # print(techniques)

        fluency_data = []
        for key, value in request.data.items():
            if key.startswith('fluency'):
                fluency_data.append(value)
        #  print(fluency_data)

        additional_details = {
            'therapist':therapist.id,
            'age':request.data['age'], 
            'gender': request.data['gender'],
            'qualification': request.data['qualification'],
            'experience': request.data['experience'],
            'hoursPerWeek': request.data['hoursPerWeek'],
            'experience': request.data['experience'],
            'specialization': specializations,
            'technique': techniques,
            'describeYourSelf': request.data['describeYourSelf'],
            "fluency":fluency_data,
            'videoCallInfrastructure': request.data['videoCallInfrastructure'],
            'chat2to3TimesADay': request.data['chat2to3TimesADay'],
            'sessionPreferredTime': request.data['sessionPreferredTime'],
            'resume': request.data['resume'] 

        }
        serializer = TherapistAdditionalDetailsSerializer(data=additional_details)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        serializer.save()
        

        
       

        # print(describeYourSelf)
        # fluency = request.data['fluency'][0] 
        # parsed_fluency = json.loads(fluency)
        # print(fluency)
        
    

        return Response(serializer.data, status = status.HTTP_200_OK)

class LCTherapistAvailability(GenericAPIView, ListModelMixin, CreateModelMixin):
    permission_classes = [permissions.IsAuthenticated]

    serializer_class = TherapistAvailabilitySerializer
    queryset = TherapistAvailability.objects.all()


    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)

from datetime import datetime
class RetrieveTherapistAvailability(APIView):
    def get(self, request, date_time):
        print(request.user)
        thrapist = request.user
        print(date_time)
        availability = TherapistAvailability.objects.filter(date_time__date=date_time).first()
        serialzier = TherapistAvailabilitySerializer(availability)
        # print(availability.date_time)
        # print(availability.date)
        # print(availability.time)

        return Response (serialzier.data, status=status.HTTP_200_OK)



# class RUDTherapistAvailability(GenericAPIView, RetrieveModelMixin, UpdateModelMixin, DestroyModelMixin):
#     permission_classes = [permissions.IsAuthenticated]
#     serializer_class = TherapistAvailabilitySerializer
#     queryset = TherapistAvailability.objects.all()
#     lookup_field = 'date_time' 

#     def get_queryset(self):
#         queryset = super().get_queryset()
#         datetime_value = self.request.query_params.get('date_time')
#         if datetime_value:
#             print(datetime_value)
#             datetime_obj = datetime.strptime(datetime_value, '%Y-%m-%dT%H:%M:%S')
#             queryset = queryset.filter(date_time=datetime_obj)
#             print(queryset)
#         return queryset


#     def get(self, request, *args, **kwargs):
#         return self.retrieve(request, *args, **kwargs)

#     def put(self, request, *args, **kwargs):
#         return self.update(request, *args, **kwargs)

#     def delete(self, request, *args, **kwargs):
#         return self.destroy(request, *args, **kwargs)
