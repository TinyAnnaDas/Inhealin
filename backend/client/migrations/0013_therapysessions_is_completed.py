# Generated by Django 4.2.2 on 2023-07-11 13:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('client', '0012_rename_cancelled_therapysessions_cancelled_by_therapist'),
    ]

    operations = [
        migrations.AddField(
            model_name='therapysessions',
            name='is_completed',
            field=models.BooleanField(default=False),
        ),
    ]
