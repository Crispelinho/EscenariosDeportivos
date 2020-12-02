# Generated by Django 3.1b1 on 2020-11-01 19:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('principal', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ActividadDeportiva',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=30)),
                ('descripcion', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='Solicitud',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('nombre', models.CharField(max_length=30)),
                ('direccion', models.CharField(max_length=30)),
                ('barrio', models.CharField(max_length=30)),
                ('correo', models.CharField(max_length=30)),
                ('tipoidentificacion', models.CharField(choices=[('CC', 'CC'), ('TI', 'TI'), ('PA', 'PA')], max_length=10)),
                ('telefono', models.CharField(max_length=30)),
                ('sexo', models.CharField(choices=[('Masculino', 'Masculino'), ('Femenino', 'Femenino')], max_length=10)),
                ('adjuntocedula', models.FileField(upload_to='uploads/cedula/% Y/% m/% d/')),
                ('adjuntorut', models.FileField(upload_to='uploads/rut/% Y/% m/% d/')),
                ('descripcion', models.CharField(max_length=30)),
                ('actividaddeportiva', models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='principal.actividaddeportiva')),
                ('discapacidad', models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='principal.discapacidad')),
                ('escenario', models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='principal.escenariodeportivo')),
                ('eventodeportivo', models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='principal.regimen')),
                ('tipoevento', models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='principal.disciplinadeportiva')),
                ('tiposolicitante', models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='principal.tiposolicitante')),
            ],
        ),
    ]