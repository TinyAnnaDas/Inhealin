# from django.shortcuts import render

# # Create your views here.


from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from  inhealin import s3
import json
from .serializers import TherapistAdditionalDetailsSerializer, CreateTherapistSerializer, TherapistSerializer


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