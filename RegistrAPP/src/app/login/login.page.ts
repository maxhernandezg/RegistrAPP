import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { ApiService } from '../api.service'; // Servicio API
import { AuthService } from '../auth.service'; // Servicio de autenticación

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  login = { username: '', password: '' }; // Modelo del formulario
  hide = true; // Control de visibilidad de la contraseña
  field = ''; // Campo faltante en el formulario

  constructor(
    public toastController: ToastController,
    private router: Router,
    private apiService: ApiService,
    private authService: AuthService
  ) {}

  ngOnInit() {}

  ingresar() {
    if (!this.validateModel(this.login)) {
      this.presentToast(`Falta: ${this.field}`);
      return;
    }

    if (!this.validateLongUsuario(this.login.username)) {
      this.presentToast('El largo del usuario debe ser entre 3 y 8 caracteres');
      this.login.username = '';
      return;
    }

    if (!this.validateLongPass(this.login.password)) {
      this.presentToast('La contraseña debe ser de largo 4 y solo numérica');
      this.login.password = '';
      return;
    }

    // Llamada al servicio API para iniciar sesión
    this.apiService.login(this.login.username, this.login.password).subscribe({
      next: (user) => this.handleLoginSuccess(user),
      error: () => this.handleLoginError(),
    });
  }

  // Manejo de inicio de sesión exitoso
  private handleLoginSuccess(user: any) {
    console.log('Usuario autenticado:', user); // Verificar usuario recibido
    this.presentToast(`Bienvenido ${user.fullName}`);
    this.authService.storeUser(user); // Guardar usuario
    this.authService.storeToken('auth-token'); // Guardar token
  
    const navigationExtras: NavigationExtras = { state: { user } };
  
    // Ajuste para aceptar "alumno" como "student"
    if (user.role === 'docente') {
      console.log('Redirigiendo a docente-home'); // Log para seguimiento
      this.router.navigate(['docente-home'], navigationExtras); // Redirigir a docente-home
    } else if (user.role === 'alumno') {
      console.log('Redirigiendo a student-home'); // Log para seguimiento
      this.router.navigate(['student-home'], navigationExtras); // Redirigir a student-home
    } else {
      console.log('Rol no permitido:', user.role); // Log del error
      this.presentToast(`Rol no permitido: ${user.role}`);
    }
  }

  // Manejo de error en inicio de sesión
  private handleLoginError() {
    this.presentToast('Usuario o contraseña incorrectos');
    this.login.password = ''; // Limpiar el campo de contraseña
  }

  // Validar el modelo del formulario
  private validateModel(model: any): boolean {
    for (const [key, value] of Object.entries(model)) {
      if (value === '') {
        this.field = key;
        return false;
      }
    }
    return true;
  }

  // Validar longitud del nombre de usuario
  private validateLongUsuario(username: string): boolean {
    return username.length >= 3 && username.length <= 8;
  }

  // Validar longitud de la contraseña
  private validateLongPass(password: string): boolean {
    return password.length === 4 && !isNaN(Number(password));
  }

  // Mostrar notificaciones
  private async presentToast(message: string, duration: number = 2000) {
    const toast = await this.toastController.create({
      message,
      duration,
    });
    toast.present();
  }
}
