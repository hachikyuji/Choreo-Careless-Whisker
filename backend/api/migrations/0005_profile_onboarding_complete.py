# Generated by Django 5.1.1 on 2024-11-08 09:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_alter_profile_email_alter_profile_first_name_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='profile',
            name='onboarding_complete',
            field=models.BooleanField(default=False),
        ),
    ]
