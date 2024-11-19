import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
import { AuthService } from '../../../auth.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.page.html',
  styleUrls: ['./student-home.page.scss'],
})
export class StudentHomePage implements OnInit {
  userName: string = 'Estudiante';

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

  // Abre el menú lateral
  openMenu() {
    this.menu.open('end');
  }

  // Cambia el segmento seleccionado
  segmentChanged(event: any) {
    const selectedSegment = event.detail.value;
    this.router.navigate([`/student-home/${selectedSegment}`]);
  }

  // Cerrar sesión
  async logout() {
    this.authService.logout();
    const toast = await this.toastController.create({
      message: 'Sesión cerrada con éxito',
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
    this.router.navigate(['/login']); // Redirige al inicio de sesión
  }
}
