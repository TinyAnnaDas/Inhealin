from rest_framework import serializers

from .models import TherapistAdditionalDetails, Therapist



class CreateTherapistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Therapist
        fields = ("id", "name", "email", "phone", "password", "is_staff", "is_active", 'image')

    def create(self, validated_data):
        therapist = Therapist.objects.create_user(
            name = validated_data["name"],
            email = validated_data["email"],
            phone = validated_data["phone"],
            password = validated_data["password"],
        )
        return therapist

class TherapistSerializer(serializers.ModelSerializer):
    class Meta:
        model = Therapist
        fields = ("name", "email", "phone")


class TherapistAdditionalDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = TherapistAdditionalDetails
        fields = '__all__'