import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  styleUrls: ['./clases.component.scss'],
})
export class ClasesComponent implements OnInit {
  clases: any[] = []; // Lista de clases del profesor
  selectedClass: any = null; // Clase seleccionada para actualizar
  newClass: any = { className: '', teacherId: 1 }; // Modelo para nueva clase
  teacherId: number = 1; // Simula el ID del profesor logueado

  constructor(
    private apiService: ApiService,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    this.loadClasses();
  }

  // Cargar las clases del profesor
  loadClasses() {
    this.apiService.getClassesByTeacher(this.teacherId).subscribe({
      next: (clases) => {
        this.clases = clases;
        console.log('Clases cargadas:', clases);
      },
      error: (error) => {
        console.error('Error al cargar clases:', error);
        this.presentToast('Error al cargar clases');
      },
    });
  }

  // Seleccionar una clase para actualizar
  selectClass(clase: any) {
    this.selectedClass = { ...clase }; // Crear copia de la clase seleccionada
  }

  // Actualizar clase existente
  updateClass() {
    this.apiService.updateClass(this.selectedClass.id, this.selectedClass).subscribe({
      next: () => {
        this.presentToast('Clase actualizada exitosamente');
        this.loadClasses();
        this.selectedClass = null; // Limpiar selección
      },
      error: (error) => {
        console.error('Error al actualizar clase:', error);
        this.presentToast('Error al actualizar clase');
      },
    });
  }

  // Crear nueva clase
  createClass() {
    if (this.newClass.className.trim() === '') {
      this.presentToast('El nombre de la clase no puede estar vacío');
      return;
    }

    this.apiService.createClass(this.newClass).subscribe({
      next: () => {
        this.presentToast('Clase creada exitosamente');
        this.loadClasses();
        this.newClass = { className: '', teacherId: this.teacherId };
      },
      error: (error) => {
        console.error('Error al crear clase:', error);
        this.presentToast('Error al crear clase');
      },
    });
  }

  // Eliminar clase y sus asistencias
  deleteClass(clase: any) {
    this.apiService.deleteClassWithAttendance(clase.id).subscribe({
      next: () => {
        this.presentToast('Clase y asistencias eliminadas');
        this.loadClasses();
      },
      error: (error) => {
        console.error('Error al eliminar clase:', error);
        this.presentToast('Error al eliminar clase');
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
