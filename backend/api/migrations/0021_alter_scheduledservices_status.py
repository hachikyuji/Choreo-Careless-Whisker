# Generated by Django 5.1.1 on 2024-12-11 02:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0020_alter_pets_pet_age'),
    ]

    operations = [
        migrations.AlterField(
            model_name='scheduledservices',
            name='status',
            field=models.BooleanField(default=False, null=True),
        ),
    ]
