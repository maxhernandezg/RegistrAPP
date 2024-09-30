import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  login: any = {
    Usuario: '',
    Password: ''
  };

  private token = "hola";

  hide: boolean = true; // Para manejar la visibilidad de la contraseña

  private usuarios: any[] = [
    { username: 'admin', password: '1234' },
    { username: 'user1', password: 'pass1' }
  ];

  field: string = '';

  constructor(public toastController: ToastController, private router: Router, private authService: AuthService) {}

  ngOnInit() {}

  ingresar() {
    if (this.validateModel(this.login)) {
      if (this.validateLongUsuario(this.login.Usuario)) {
        if (this.validateLongPass(this.login.Password)) {
          const usuarioValido = this.usuarios.find(user => user.username === this.login.Usuario && user.password === this.login.Password);
          if (usuarioValido) {
            this.authService.storeToken(this.token);
            this.presentToast('Bienvenido ' + this.login.Usuario);
            let navigationExtras: NavigationExtras = {
              state: { user: this.login.Usuario }
            };
            this.router.navigate(['home'], navigationExtras);
          } else {
            this.presentToast('Usuario o contraseña incorrectos');
            this.login.Password = '';
          }
        } else {
          this.presentToast('La contraseña debe ser de largo 4 y solo numérica');
          this.login.Password = '';
        }
      } else {
        this.presentToast('El largo del usuario debe ser entre 3 y 8 caracteres');
        this.login.Usuario = '';
      }
    } else {
      this.presentToast('Falta: ' + this.field);
    }
  }


  validateModel(model: any) {
    for (var [key, value] of Object.entries(model)) {
      if (value == '') {
        this.field = key;
        return false;
      }
    }
    return true;
  }

  validateLongUsuario(dato: string) {
    return dato.length >= 3 && dato.length <= 8;
  }

  validateLongPass(dato: string) {
    return dato.length == 4 && Number.isInteger(Number(dato));
  }

  async presentToast(message: string, duration?: number) {
    const toast = await this.toastController.create({
      message,
      duration: duration ? duration : 2000,
    });
    toast.present();
  }
}
