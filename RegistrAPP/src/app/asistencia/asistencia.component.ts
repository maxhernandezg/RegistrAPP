import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service'; // Ajusta la ruta según tu proyecto
import { ToastController } from '@ionic/angular';

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
    public toastController: ToastController
  ) {}

  ngOnInit() {
    this.loadClasses();
    this.loadAttendance();
  }

  // Cargar todas las clases disponibles
  loadClasses() {
    this.apiService.getClasses().subscribe({
      next: (clases) => {
        this.clases = clases;
        console.log('Clases cargadas:', clases);
      },
      error: (err) => {
        console.error('Error al cargar clases:', err);
        this.presentToast('Error al cargar clases');
      },
    });
  }

  // Cargar las asistencias registradas del usuario
  loadAttendance() {
    const userId = 2; // Reemplazar con el ID del usuario actual
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
  }

  // Registrar asistencia para una clase
  registerAttendance(classId: number) {
    const attendance = { userId: 2, classId }; // Reemplazar con el ID del usuario actual
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

  // Eliminar asistencia de una clase
  deleteAttendance(classId: number) {
    this.apiService.getAttendanceByUser(2).subscribe({
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
        }
      },
      error: (err) => {
        console.error('Error al obtener asistencias:', err);
        this.presentToast('Error al obtener asistencias');
      },
    });
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
