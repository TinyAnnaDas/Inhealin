# Generated by Django 4.2.2 on 2023-06-19 15:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('client', '0007_user_image'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='status',
            field=models.CharField(blank=True, max_length=255, null=True),
        ),
    ]