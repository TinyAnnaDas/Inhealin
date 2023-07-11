# Generated by Django 4.2.2 on 2023-06-26 07:20

import django.contrib.postgres.fields
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('therapist', '0006_therapistavailability_session_booked'),
    ]

    operations = [
        migrations.AlterField(
            model_name='therapistadditionaldetails',
            name='age',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='therapistadditionaldetails',
            name='chat2to3TimesADay',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='therapistadditionaldetails',
            name='experience',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='therapistadditionaldetails',
            name='fluency',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(blank=True, max_length=255, null=True), size=None),
        ),
        migrations.AlterField(
            model_name='therapistadditionaldetails',
            name='gender',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='therapistadditionaldetails',
            name='hoursPerWeek',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='therapistadditionaldetails',
            name='qualification',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
        migrations.AlterField(
            model_name='therapistadditionaldetails',
            name='resume',
            field=models.CharField(blank=True, max_length=1000, null=True),
        ),
        migrations.AlterField(
            model_name='therapistadditionaldetails',
            name='sessionPreferredTime',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='therapistadditionaldetails',
            name='specialization',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(blank=True, max_length=255, null=True), size=None),
        ),
        migrations.AlterField(
            model_name='therapistadditionaldetails',
            name='technique',
            field=django.contrib.postgres.fields.ArrayField(base_field=models.CharField(blank=True, max_length=1000, null=True), size=None),
        ),
    ]
