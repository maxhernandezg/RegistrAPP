import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  constructor(private authService: AuthService, private router: Router) {
    // Redireccionar a la ruta de asistencia por defecto
    this.router.navigate(['home/asistencia']);
  }

  segmentChanged($event: any) {
    console.log($event.detail.value);
    let direction = $event.detail.value;

    // Navegar hacia la ruta seleccionada en el segmento
    this.router.navigate(['home/' + direction]);
  }

  logOut() {
    this.authService.removeToken();
    this.router.navigate(['/login']);
  }
}
