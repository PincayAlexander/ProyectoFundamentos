from django import forms
from django.contrib.auth.forms import AuthenticationForm

# Formulario de inicio de sesión
class loginForm(AuthenticationForm):
    username = forms.CharField(
        label='Usuario', 
        max_length=50,
        widget=forms.TextInput(attrs={
            'placeholder': 'Usuario',
            'class': 'campo',
            'autofocus': True,
            'required': True,
        }))
    password = forms.CharField(
        label='Contraseña', 
        max_length=50,
        widget=forms.PasswordInput(attrs={
            'placeholder': 'Contraseña',
            'class': 'campo',
            'required': True,
        }))
    def __init__(self, *args, **kwargs):
        self.request = kwargs.pop('request', None)
        super().__init__(*args, **kwargs)
