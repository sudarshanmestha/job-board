# Generated by Django 3.2.9 on 2024-04-04 11:25

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('jobs', '0002_job_available'),
    ]

    operations = [
        migrations.AddField(
            model_name='job',
            name='compamy_logo',
            field=models.ImageField(blank=True, null=True, upload_to=''),
        ),
        migrations.AddField(
            model_name='job',
            name='company_name',
            field=models.CharField(default='Facebook', max_length=50),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='job',
            name='company_website',
            field=models.URLField(default='https://facebook.com'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='job',
            name='user',
            field=models.ForeignKey(default='1', on_delete=django.db.models.deletion.CASCADE, related_name='jobs', to='users.user'),
            preserve_default=False,
        ),
    ]