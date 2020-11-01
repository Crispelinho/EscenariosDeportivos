from django.db import models

# Create your models here.

class TipoSolicitante(models.Model):
    id=models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    descripcion = models.CharField(max_length=30)

class DisciplinaDeportiva(models.Model):
    id=models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    descripcion = models.CharField(max_length=30)

class EscenarioDeportivo(models.Model):
    id=models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    descripcion = models.CharField(max_length=30)

class TipoIdentificacion(Enum):
    cc = "CC"
    ti = "TI"
    pa = "PA"

class Sexo(Enum):
    masculino = "Masculino"
    femenino = "Femenino"

class Discapacidad(models.Model):
    id=models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    descripcion = models.CharField(max_length=30)

class Regimen(models.Model):
    id=models.AutoField(primary_key=True)
    nombre = models.CharField(max_length=30)
    descripcion = models.CharField(max_length=30)

class Solicitud(models.Model):
    id=models.AutoField(primary_key=True)
    tiposolicitante = models.ForeignKey(TipoSolicitante, default="", on_delete=models.CASCADE)
    nombre = models.CharField(max_length=30)
    direccion = models.CharField(max_length=30)
    barrio = models.CharField(max_length=30)
    correo = models.CharField(max_length=30)
    tipoidentificacion = models.CharField(max_length=10,blank=False,choices=[((tag.value, tag.value)) for tag in TipoIdentificacion])   
    telefono = models.CharField(max_length=30)
    sexo = models.CharField(max_length=10,blank=False,choices=[((tag.value, tag.value)) for tag in Sexo])   
    discapacidad = models.ForeignKey(Discapacidad, default="", on_delete=models.CASCADE)
    adjuntocedula = models.FileField(upload_to ='uploads/cedula/% Y/% m/% d/') 
    adjuntorut =  models.FileField(upload_to ='uploads/rut/% Y/% m/% d/')   
    escenario =   models.ForeignKey(EscenarioDeportivo, default="", on_delete=models.CASCADE)
    tipoevento =models.ForeignKey(DisciplinaDeportiva, default="", on_delete=models.CASCADE)
    actividaddeportiva =models.ForeignKey(EscenarioDeportivo, default="", on_delete=models.CASCADE)
    descripcion =  models.CharField(max_length=30)
    eventodeportivo = models.ForeignKey(Regimen, default="", on_delete=models.CASCADE)