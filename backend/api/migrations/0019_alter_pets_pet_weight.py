# Generated by Django 5.1.1 on 2024-12-03 12:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0018_scheduledservices_finished'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pets',
            name='pet_weight',
            field=models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True),
        ),
    ]