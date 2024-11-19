import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'; // Ajusta la ruta según tu proyecto
import { ToastController } from '@ionic/angular';
import { AuthService } from '../auth.service'; // Asegúrate de importar el AuthService

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.scss'],
})
export class AsistenciaComponent implements OnInit {
  clases: any[] = []; // Clases disponibles
  attendedClasses = new Set<number>(); // Clases en las que el usuario ha registrado asistencia

  constructor(
    private apiService: ApiService,
    private authService: AuthService, // Agregar AuthService para obtener el usuario actual
    public toastController: ToastController
  ) {}

  ngOnInit() {
    this.loadUserClasses();
    this.loadAttendance();
  }

  // Cargar las clases que tiene asignadas el usuario
  loadUserClasses() {
    const currentUser = this.authService.getCurrentUser(); // Obtiene el usuario actual
    if (currentUser && currentUser.enrolledClasses) {
      this.apiService.getClasses().subscribe({
        next: (clases) => {
          // Filtrar manualmente las clases por `enrolledClasses`
          this.clases = clases.filter(clase =>
            currentUser.enrolledClasses.includes(Number(clase.id))
          );
          console.log('Clases filtradas manualmente:', this.clases); // Debug para verificar el resultado
        },
        error: (err) => {
          console.error('Error al cargar clases del usuario:', err);
          this.presentToast('Error al cargar clases');
        },
      });
    } else {
      console.warn('No se encontraron clases asignadas para el usuario');
      this.presentToast('No tienes clases asignadas');
    }
  }
  

  // Cargar las asistencias registradas del usuario
  loadAttendance() {
    const currentUser = this.authService.getCurrentUser();
    const userId = currentUser?.id; // Obtener el ID del usuario actual
    if (userId) {
      this.apiService.getAttendanceByUser(userId).subscribe({
        next: (attendances) => {
          attendances.forEach((attendance) =>
            this.attendedClasses.add(attendance.classId)
          );
        },
        error: (err) => {
          console.error('Error al cargar asistencias:', err);
          this.presentToast('Error al cargar asistencias');
        },
      });
    } else {
      console.warn('Usuario no autenticado');
    }
  }

  // Registrar asistencia para una clase
  registerAttendance(classId: number) {
    const currentUser = this.authService.getCurrentUser();
    const userId = currentUser?.id; // Obtener el ID del usuario actual
    if (userId) {
      const attendance = { userId, classId };
      this.apiService.registerAttendance(attendance).subscribe({
        next: () => {
          this.attendedClasses.add(classId);
          this.presentToast('Asistencia registrada');
        },
        error: (err) => {
          console.error('Error al registrar asistencia:', err);
          this.presentToast('Error al registrar asistencia');
        },
      });
    }
  }

  // Eliminar asistencia de una clase
  deleteAttendance(classId: number) {
    const currentUser = this.authService.getCurrentUser();
    const userId = currentUser?.id; // Obtener el ID del usuario actual
    if (userId) {
      this.apiService.getAttendanceByUser(userId).subscribe({
        next: (attendances) => {
          const attendance = attendances.find(
            (a) => a.classId === classId
          );
          if (attendance) {
            this.apiService.deleteAttendance(attendance.id).subscribe({
              next: () => {
                this.attendedClasses.delete(classId);
                this.presentToast('Asistencia eliminada');
              },
              error: (err) => {
                console.error('Error al eliminar asistencia:', err);
                this.presentToast('Error al eliminar asistencia');
              },
            });
          } else {
            console.warn(`No se encontró asistencia para la clase ${classId}`);
          }
        },
        error: (err) => {
          console.error('Error al obtener asistencias:', err);
          this.presentToast('Error al obtener asistencias');
        },
      });
    }
  }

  // Mostrar notificación
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
    });
    toast.present();
  }
}
