from django.shortcuts import render, redirect
from .models import *
from .forms import *
from django.contrib.auth.decorators import login_required
from django.contrib.auth.views import LoginView, LogoutView

# Inicio de sesión
class CustomLoginView(LoginView):
    template_name = "registration/login.html"
    authentication_form = loginForm

# Cerrar sesión
class CustomLogoutView(LogoutView):
    next_page = 'login'

@login_required
# Vista de inicio
def index_view (requeset):
    return render(requeset, 'Uvirtual/index.html')

@login_required
# Calificación
def calificacion_view (request):
    return render(request, 'Uvirtual/calificacion.html')

@login_required
# Actividad
def actividad_view (request):
    return render(request, 'Uvirtual/actividad.html')

@login_required
# Asignatura
def asignatura_view (request):
    return render(request, 'Uvirtual/asignatura.html')


@login_required
# Horario
def horario_view (request):
    return render(request, 'Uvirtual/horario.html')

@login_required
# Citación
def citacion_view (request):
    return render(request, 'Uvirtual/citacion.html')

@login_required
# Tutoría
def tutoria_view (request):
    return render(request, 'Uvirtual/tutoria.html')
