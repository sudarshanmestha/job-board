# Generated by Django 3.2.9 on 2024-04-26 19:42

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0006_rename_date_untile_sponsoredjobpost_date_until'),
    ]

    operations = [
        migrations.RenameField(
            model_name='job',
            old_name='compamy_logo',
            new_name='company_logo',
        ),
    ]