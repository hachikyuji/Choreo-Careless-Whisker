# Generated by Django 5.1.1 on 2024-11-25 10:55

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0009_scheduledservices_scheduled_time'),
    ]

    operations = [
        migrations.AddField(
            model_name='scheduledservices',
            name='end_time',
            field=models.TimeField(blank=True, default='00:00:00', null=True),
        ),
    ]
