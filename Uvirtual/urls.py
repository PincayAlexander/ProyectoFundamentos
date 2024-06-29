from django.urls import path
from . import views
from .views import CustomLoginView

urlpatterns = [
    path('', CustomLoginView.as_view(), name='login'),
    path('logout/', views.logout_view, name='logout'),
    path('uvirtual/', views.index_view, name='uvirtual'),
    path('calificaciones/', views.calificacion_view, name='calificacion'),
    path('actividades/', views.actividad_view, name='actividad'),
    path('horarios/', views.horario_view, name='horario'),
    path('citaciones/', views.citacion_view, name='citacion'),
    path('tutorias/', views.tutoria_view, name='tutoria'),
]