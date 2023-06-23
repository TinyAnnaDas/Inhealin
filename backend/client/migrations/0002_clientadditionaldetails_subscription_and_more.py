# Generated by Django 4.2.2 on 2023-06-14 07:33

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('cadmin', '0001_initial'),
        ('client', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='clientadditionaldetails',
            name='subscription',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='cadmin.subscriptionplans'),
        ),
        migrations.AddField(
            model_name='subscriptions',
            name='subscription_plan',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='cadmin.subscriptionplans'),
        ),
    ]
