import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
import { AuthService } from '../../../auth.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-docente-home',
  templateUrl: './docente-home.page.html',
  styleUrls: ['./docente-home.page.scss'],
})
export class DocenteHomePage implements OnInit {
  userName: string = 'Docente';

  constructor(
    private router: Router,
    private menu: MenuController,
    private authService: AuthService,
    private toastController: ToastController // Para mostrar mensajes
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as { user: { fullName: string } };
    if (state) {
      this.userName = state.user.fullName;
    }
  }

  ngOnInit() {}
  
  ionViewWillEnter() {
    const currentUser = this.authService.getCurrentUser(); // Obtiene el usuario actual
    if (currentUser) {
      this.userName = currentUser.fullName; // Asigna el nombre completo del usuario
    } else {
      this.userName = 'Docente'; // Valor predeterminado si no hay usuario
      console.warn('No se encontró un usuario autenticado.');
    }
  }

  // Abre el menú lateral
  openMenu() {
    this.menu.open('end');
  }

  // Cambia el segmento seleccionado
  segmentChanged(event: any) {
    const selectedSegment = event.detail.value;
    this.router.navigate([`/docente-home/${selectedSegment}`]);
  }

  // Cerrar sesión
  async logout() {
    this.authService.logout(); // Llama al método del servicio de autenticación
    this.userName = 'Docente'; // Restablece el valor predeterminado
    const toast = await this.toastController.create({
      message: 'Sesión cerrada con éxito',
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
    this.router.navigate(['/login']); // Redirige al inicio de sesión
  }
}
