import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController, ToastController } from '@ionic/angular';
import { AuthService } from '../../../auth.service';

@Component({
  selector: 'app-docente-home',
  templateUrl: './docente-home.page.html',
  styleUrls: ['./docente-home.page.scss'],
})
export class DocenteHomePage implements OnInit {
  userName: string = 'Docente';
  currentSegment: string = 'clases'; // Controla el segmento activo

  constructor(
    private router: Router,
    private menu: MenuController,
    private authService: AuthService,
    private toastController: ToastController
  ) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as { user: { fullName: string } };
    if (state) {
      this.userName = state.user.fullName;
    }
  }

  ngOnInit() {}

  ionViewWillEnter() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.userName = currentUser.fullName;
    } else {
      this.userName = 'Docente';
    }
  }

  openMenu() {
    this.menu.open('end');
  }

  segmentChanged(event: any) {
    const selectedSegment = event.detail?.value || event;
    this.currentSegment = selectedSegment;
    this.router.navigate([`/docente-home/${selectedSegment}`]);
  }

  async logout() {
    this.authService.logout();
    this.userName = 'Docente';
    const toast = await this.toastController.create({
      message: 'Sesión cerrada con éxito',
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
    this.router.navigate(['/login']);
  }
}
