from django.urls import path
from .views import CustomLoginView, CustomLogoutView
from . import views

urlpatterns = [
    path('accounts/login/', CustomLoginView.as_view(), name='login'),
    path('accounts/logout/', CustomLogoutView.as_view(), name='logout'),
    path('', views.index_view, name='uvirtual'),
    path('calificaciones/', views.calificacion_view, name='calificacion'),
    path('actividades/', views.actividad_view, name='actividad'),
    path('horarios/', views.horario_view, name='horario'),
    path('citaciones/', views.citacion_view, name='citacion'),
    path('tutorias/', views.tutoria_view, name='tutoria'),
]