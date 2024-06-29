from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.models import User


"""
# Modelo de Usuario extendido
class Usuario(AbstractUser):
    cedula = models.CharField(max_length=10, unique=True)
    direccion = models.CharField(max_length=255, blank=True, null=True)
    correo = models.EmailField(unique=True)
    ROL_CHOICES = [
        ('estudiante', 'Estudiante'),
        ('docente', 'Docente'),
        ('personal_administrativo', 'Personal Administrativo')
    ]
    rol = models.CharField(max_length=50, choices=ROL_CHOICES)

    def __str__(self):
        return f"{self.username} ({self.rol})"

# Modelo de Estudiante que hereda de Usuario
class Estudiante(models.Model):
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE)

    def __str__(self):
        return f"Estudiante: {self.usuario.username}"

# Modelo de Docente que hereda de Usuario
class Docente(models.Model):
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE)

    def __str__(self):
        return f"Docente: {self.usuario.username}"

# Modelo de Personal Administrativo que hereda de Usuario
class PersonalAdministrativo(models.Model):
    usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE)

    def __str__(self):
        return f"Personal Administrativo: {self.usuario.username}"
"""

# Modelo de Asignatura
class Asignatura(models.Model):
    nombre = models.CharField(max_length=100, unique=True)
    descripcion = models.TextField()
    nivel = models.IntegerField()
    # curso =

    def __str__(self):
        return self.nombre

# Modelo de Calificación
class Calificacion(models.Model):
    estudiante = models.ForeignKey(User, on_delete=models.CASCADE)
    tipo_parcial = models.IntegerField()
    promedio_parcial = models.IntegerField()
    examen_quimestral = models.IntegerField()
    supletorio = models.IntegerField()

    def __str__(self):
        return f"Calificación de {self.estudiante.usuario.username} - Parcial {self.tipo_parcial}"

# Modelo de Actividad
class Actividad(models.Model):
    titulo = models.CharField(max_length=200)
    enunciado = models.TextField()
    fecha_inicio = models.DateField()
    fecha_cierre = models.DateField()
    rubrica = models.TextField()
    docente = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return self.titulo

# Modelo de Citación
class Citacion(models.Model):
    codigo = models.AutoField(primary_key=True)
    estudiante = models.ForeignKey(User, on_delete=models.CASCADE)
    representante_legal = models.CharField(max_length=100)
    gravedad = models.CharField(max_length=50)
    motivo = models.TextField()
    fecha_emision = models.DateField()
    fecha_asistencia = models.DateField()
    advertencia = models.TextField()

    def __str__(self):
        return f"Citacion {self.codigo} para {self.estudiante.usuario.username}"

# Modelo de Conducta
class Conducta(models.Model):
    codigo = models.AutoField(primary_key=True)
    estudiante = models.ForeignKey(User, on_delete=models.CASCADE)
    fecha_registro = models.DateField()
    incidente = models.TextField()
    tipo_conducta = models.CharField(max_length=50)
    descripcion_adicional = models.TextField()

    def __str__(self):
        return f"Conducta {self.codigo} de {self.estudiante.usuario.username}"

# Modelo de Tutoria
class Tutoria(models.Model):
    estudiante = models.ForeignKey(User, on_delete=models.CASCADE)
    cantidad_horas = models.IntegerField()
    aula = models.CharField(max_length=100)
    dia = models.IntegerField()
    hora = models.TimeField()
    asistencia = models.BooleanField()

    def __str__(self):
        return f"Tutoria de {self.estudiante.usuario.username} en {self.aula}"

# Modelo de Horario
class Horario(models.Model):
    asignatura = models.ForeignKey(Asignatura, on_delete=models.CASCADE)
    #curso = models.CharField(max_length=100)
    dia = models.IntegerField()
    hora_inicio = models.TimeField()
    hora_finalizacion = models.TimeField()

    def __str__(self):
        return f"Horario de {self.asignatura.nombre} para {self.curso}"

