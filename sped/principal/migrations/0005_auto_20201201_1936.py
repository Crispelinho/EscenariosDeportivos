# Generated by Django 3.1b1 on 2020-12-02 00:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('principal', '0004_auto_20201201_1839'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='actividaddeportiva',
            options={'verbose_name': 'Actividad Deportiva', 'verbose_name_plural': 'Actividades Deportivas'},
        ),
        migrations.AlterModelOptions(
            name='discapacidad',
            options={'verbose_name': 'Discapacidad', 'verbose_name_plural': 'Discapacidades'},
        ),
        migrations.AlterModelOptions(
            name='disciplinadeportiva',
            options={'verbose_name': 'Disciplina Deportiva', 'verbose_name_plural': 'Disciplinas Deportivas'},
        ),
        migrations.AlterModelOptions(
            name='escenariodeportivo',
            options={'verbose_name': 'Escenario Deportivo', 'verbose_name_plural': 'Escenarios Deportivos'},
        ),
        migrations.AlterModelOptions(
            name='regimen',
            options={'verbose_name': 'Regimen', 'verbose_name_plural': 'Regímenes'},
        ),
        migrations.AlterModelOptions(
            name='solicitud',
            options={'verbose_name': 'Solicitud', 'verbose_name_plural': 'Solicitudes'},
        ),
        migrations.AlterModelOptions(
            name='tiposolicitante',
            options={'verbose_name': 'Tipo Solicitante', 'verbose_name_plural': 'Tipos Solicitante'},
        ),
    ]
