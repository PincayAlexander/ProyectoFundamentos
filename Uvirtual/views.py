from django.shortcuts import render, redirect
from .models import *
from .forms import *
from django.contrib.auth.decorators import login_required
from django.contrib.auth.views import LoginView
from django.contrib.auth import logout

# Inicio de sesión
class CustomLoginView(LoginView):
    template_name = "registration/login.html"
    form_class = loginForm

# Cerrar sesión
def logout_view(request):
    logout(request)
    return redirect('login')


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
