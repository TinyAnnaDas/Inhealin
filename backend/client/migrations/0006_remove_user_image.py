# Generated by Django 4.2.2 on 2023-06-19 14:50

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('client', '0005_user_status'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='image',
        ),
    ]