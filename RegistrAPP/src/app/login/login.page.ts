import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { ApiService } from '../api.service'; // Importación del servicio API
import { AuthService } from '../auth.service'; // Importación del servicio de autenticación

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  login: any = {
    username: '',
    password: ''
  };

  private token = 'hola';
  hide: boolean = true; // Maneja la visibilidad de la contraseña
  field: string = '';

  constructor(
    public toastController: ToastController,
    private router: Router,
    private apiService: ApiService, // Inyectamos ApiService
    private authService: AuthService // Inyectamos AuthService
  ) {}

  ngOnInit() {}

  // Método para validar e ingresar al sistema
  ingresar() {
    if (this.validateModel(this.login)) {
      if (this.validateLongUsuario(this.login.username)) {
        if (this.validateLongPass(this.login.password)) {
          this.apiService
            .login(this.login.username, this.login.password) // Llamada al servicio API
            .subscribe({
              next: (user) => {
                this.presentToast('Bienvenido ' + user.fullName); // Mensaje de bienvenida
                this.authService.storeToken(this.token); // Guardar el token

                const navigationExtras: NavigationExtras = {
                  state: { user: user },
                };
                this.router.navigate(['home'], navigationExtras); // Navegar al home
              },
              error: () => {
                this.presentToast('Usuario o contraseña incorrectos');
                this.login.password = ''; // Limpiar contraseña
              },
            });
        } else {
          this.presentToast('La contraseña debe ser de largo 4 y solo numérica');
          this.login.password = '';
        }
      } else {
        this.presentToast('El largo del usuario debe ser entre 3 y 8 caracteres');
        this.login.username = '';
      }
    } else {
      this.presentToast('Falta: ' + this.field);
    }
  }

  // Validar el modelo del formulario
  validateModel(model: any) {
    for (const [key, value] of Object.entries(model)) {
      if (value === '') {
        this.field = key;
        return false;
      }
    }
    return true;
  }

  // Validar longitud del usuario
  validateLongUsuario(dato: string) {
    return dato.length >= 3 && dato.length <= 8;
  }

  // Validar longitud de la contraseña
  validateLongPass(dato: string) {
    return dato.length === 4 && Number.isInteger(Number(dato));
  }

  // Mostrar notificaciones en pantalla
  async presentToast(message: string, duration?: number) {
    const toast = await this.toastController.create({
      message,
      duration: duration ? duration : 2000,
    });
    toast.present();
  }
}
