import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.component.html',
  styleUrls: ['./clases.component.scss'],
})
export class ClasesComponent implements OnInit {
  clases: any[] = [];
  filteredClases: any[] = [];
  classrooms: any[] = [];
  selectedClass: any = null;
  newClass: any = { className: '', teacherId: null };
  teacherId: number | null = null;
  todayName: string = '';

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    this.initializeTeacherId();
    this.loadClasses();
    this.loadClassrooms();
    this.setTodayName();
  }

  setTodayName() {
    const days = [
      'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado',
    ];
    const today = new Date();
    this.todayName = days[today.getDay()];
  }

  getTimeBlock(blockId: number): string {
    const block = this.apiService.getTimeBlockById(blockId);
    return block ? `${block.startTime} - ${block.endTime}` : '';
  }

  isLastBlock(blockIds: number[], blockId: number): boolean {
    return blockIds[blockIds.length - 1] === blockId;
  }

  filterClassesByToday() {
  const todayIndex = new Date().getDay();
  this.filteredClases = this.clases.filter((clase) =>
    clase.schedule.some((sched: { dayId: number; timeBlockIds: number[] }) => sched.dayId === todayIndex)
  );
  this.filteredClases.forEach((clase) => {
    clase.timeBlockIds = clase.schedule
      .find((sched: { dayId: number; timeBlockIds: number[] }) => sched.dayId === todayIndex)?.timeBlockIds || [];
  });
}


  initializeTeacherId() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.role === 'docente') {
      this.teacherId = Number(currentUser.id);
      this.newClass.teacherId = this.teacherId;
    } else {
      console.error('Usuario no autorizado o no es docente.');
      this.presentToast('Acceso denegado: No tienes permisos para ver esta página.');
    }
  }

  loadClasses() {
    if (!this.teacherId) {
      console.error('No se pudo cargar el teacherId del usuario.');
      return;
    }

    this.apiService.getClassesByTeacher(this.teacherId).subscribe({
      next: (clases) => {
        this.clases = clases;
        this.filterClassesByToday();
      },
      error: (error) => {
        console.error('Error al cargar clases:', error);
        this.presentToast('Error al cargar clases');
      },
    });
  }

  loadClassrooms() {
    this.apiService.getClassrooms().subscribe({
      next: (classrooms) => {
        this.classrooms = classrooms; // Almacena las aulas en la propiedad
        this.filteredClases.forEach((clase) => {
          const classroom = this.classrooms.find((room) => room.id === clase.classroomId);
          clase.classroomCode = classroom ? classroom.code : 'Sin sala';
        });
      },
      error: (error) => {
        console.error('Error al cargar aulas:', error);
        this.presentToast('Error al cargar aulas');
      },
    });
  }

  selectClass(clase: any) {
    this.selectedClass = { ...clase };
  }

  updateClass() {
    this.apiService.updateClass(this.selectedClass.id, this.selectedClass).subscribe({
      next: () => {
        this.presentToast('Clase actualizada exitosamente');
        this.loadClasses();
        this.selectedClass = null;
      },
      error: (error) => {
        console.error('Error al actualizar clase:', error);
        this.presentToast('Error al actualizar clase');
      },
    });
  }

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

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
    });
    toast.present();
  }
}
