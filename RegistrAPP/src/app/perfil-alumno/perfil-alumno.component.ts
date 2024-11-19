import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'; // Asegúrate de que la ruta sea correcta
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-perfil-alumno',
  templateUrl: './perfil-alumno.component.html',
  styleUrls: ['./perfil-alumno.component.scss'],
})
export class PerfilAlumnoComponent implements OnInit {
  alumno: any = null; // Almacena los datos del estudiante

  constructor(
    private authService: AuthService,
    private toastController: ToastController // Para mostrar mensajes
  ) {}

  ngOnInit() {
    this.loadAlumnoData(); // Cargar los datos del estudiante al inicializar
  }

  // Cargar datos del estudiante
  loadAlumnoData() {
    const currentUser = this.authService.getCurrentUser(); // Obtener el usuario actual
    if (currentUser && currentUser.role === 'alumno') {
      this.alumno = currentUser; // Asigna los datos del estudiante
    } else {
      this.alumno = null; // Si no es estudiante, limpiar los datos
      this.presentToast('No se encontraron datos para este perfil.');
    }
  }

  // Mostrar notificaciones
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'bottom',
    });
    toast.present();
  }
}
