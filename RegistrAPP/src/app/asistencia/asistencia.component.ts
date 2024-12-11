import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.component.html',
  styleUrls: ['./asistencia.component.scss'],
})
export class AsistenciaComponent implements OnInit {
  clases: any[] = [];
  filteredClases: any[] = [];
  attendedClasses = new Set<number>();
  timeBlocks: any[] = [];
  classrooms: any[] = [];
  todayName: string = '';
  availableDays = [
    { id: 0, name: 'Domingo' },
    { id: 1, name: 'Lunes' },
    { id: 2, name: 'Martes' },
    { id: 3, name: 'Miércoles' },
    { id: 4, name: 'Jueves' },
    { id: 5, name: 'Viernes' },
    { id: 6, name: 'Sábado' },
  ];

  constructor(
    private apiService: ApiService,
    private authService: AuthService,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    this.loadUserClasses();
    this.loadAttendance();
    this.loadClassrooms();
    this.loadTimeBlocks();
  }

  loadTimeBlocks() {
    this.apiService.getTimeBlocks().subscribe({
      next: (blocks) => {
        this.timeBlocks = blocks.map((block) => ({
          ...block,
          id: Number(block.id),
        }));
        console.log('Bloques horarios cargados:', this.timeBlocks);
      },
      error: (err) => {
        console.error('Error al cargar bloques horarios:', err);
        this.presentToast('Error al cargar bloques horarios');
      },
    });
  }

  getTimeBlock(blockId: number): string {
    const block = this.timeBlocks.find((b) => b.id === blockId);
    return block ? `${block.startTime} - ${block.endTime}` : 'Bloque desconocido';
  }

  isLastBlock(blockIds: number[], blockId: number): boolean {
    return blockIds[blockIds.length - 1] === blockId;
  }

  loadUserClasses() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.enrolledClasses) {
      this.apiService.getClasses().subscribe({
        next: (clases) => {
          this.clases = clases.filter((clase) =>
            currentUser.enrolledClasses.includes(Number(clase.id))
          );
          this.filterClassesByToday();
        },
        error: (err) => {
          console.error('Error al cargar clases del usuario:', err);
          this.presentToast('Error al cargar clases');
        },
      });
    } else {
      this.presentToast('No tienes clases asignadas');
    }
  }

  filterClassesByToday() {
    const todayIndex = new Date().getDay();
    this.todayName = this.availableDays[todayIndex].name;

    this.filteredClases = this.clases.filter((clase) =>
      clase.schedule.some((sched: any) => sched.dayId === todayIndex)
    );

    this.filteredClases.forEach((clase) => {
      const schedule = clase.schedule.find((sched: any) => sched.dayId === todayIndex);
      clase.timeBlockIds = schedule?.timeBlockIds || [];
      const classroom = this.classrooms.find((room) => room.id == clase.classroomId);
      clase.classroomCode = classroom ? `${classroom.code} - ${classroom.name}` : 'Sin sala';
    });
  }

  loadAttendance() {
    const currentUser = this.authService.getCurrentUser();
    const userId = currentUser?.id;
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
    }
  }

  loadClassrooms() {
    this.apiService.getClassrooms().subscribe({
      next: (classrooms) => {
        this.classrooms = classrooms;
        this.filterClassesByToday();
      },
      error: (err) => {
        console.error('Error al cargar aulas:', err);
        this.presentToast('Error al cargar aulas');
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
