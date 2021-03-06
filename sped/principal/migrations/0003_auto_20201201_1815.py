# Generated by Django 3.1b1 on 2020-12-01 23:15

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('principal', '0002_actividaddeportiva_solicitud'),
    ]

    operations = [
        migrations.AddField(
            model_name='solicitud',
            name='fecha_creacion',
            field=models.DateField(auto_now_add=True, default=django.utils.timezone.now, verbose_name='Fecha de creación'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='solicitud',
            name='fecha_vencimiento',
            field=models.DateField(blank=True, null=True, verbose_name='Fecha de vencimiento de la reserva'),
        ),
    ]
