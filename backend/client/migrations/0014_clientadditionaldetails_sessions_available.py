# Generated by Django 4.2.2 on 2023-07-12 04:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('client', '0013_therapysessions_is_completed'),
    ]

    operations = [
        migrations.AddField(
            model_name='clientadditionaldetails',
            name='sessions_available',
            field=models.IntegerField(blank=True, null=True),
        ),
    ]
