# Generated by Django 4.2.2 on 2023-06-19 15:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('client', '0008_alter_user_status'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='status',
            field=models.CharField(blank=True, default='pending', max_length=255, null=True),
        ),
    ]
