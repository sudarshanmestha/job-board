# Generated by Django 3.2.9 on 2024-04-23 11:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('jobs', '0003_auto_20240404_1125'),
    ]

    operations = [
        migrations.CreateModel(
            name='SponsoredJobPost',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_created', models.DateTimeField(auto_now_add=True)),
                ('date_untile', models.DateTimeField()),
                ('stripe_payment_intent_id', models.CharField(max_length=150)),
                ('job', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='sponsored_posts', to='jobs.job')),
            ],
        ),
    ]
