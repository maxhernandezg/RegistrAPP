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
  filteredClases: any[] = []; // Clases filtradas por el día actual
  attendedClasses = new Set<number>(); // Clases en las que el usuario ha registrado asistencia
  timeBlocks: any[] = []; 
  classrooms: any[] = []; // Información de las aulas
  todayName: string = ''; // Nombre del día actual

  constructor(
    private apiService: ApiService,
    private authService: AuthService, // Agregar AuthService para obtener el usuario actual
    public toastController: ToastController
  ) {}

  ngOnInit() {
    this.loadUserClasses();
    this.loadAttendance();
    this.loadClassrooms();
    this.loadTimeBlocks();
    this.authService.attendanceUpdated.subscribe(() => {
      this.loadAttendance();
    });
  }

  
  loadTimeBlocks() {
    this.apiService.getTimeBlocks().subscribe({
      next: (blocks) => {
        this.timeBlocks = blocks;
      },
      error: (err) => {
        console.error('Error al cargar bloques horarios:', err);
        this.presentToast('Error al cargar bloques horarios');
      },
    });
  }
  // Obtener el rango de tiempo de un bloque horario
  getTimeBlock(blockId: number): string {
    const block = this.apiService.getTimeBlockById(blockId);
    return block ? `${block.startTime} - ${block.endTime}` : '';
  }

// Verificar si es el último bloque en la lista
isLastBlock(blockIds: number[], blockId: number): boolean {
  return blockIds[blockIds.length - 1] === blockId;
}



  // Cargar las clases que tiene asignadas el usuario
  loadUserClasses() {
    const currentUser = this.authService.getCurrentUser(); // Obtiene el usuario actual
    if (currentUser && currentUser.enrolledClasses) {
      this.apiService.getClasses().subscribe({
        next: (clases) => {
          this.clases = clases.filter((clase) =>
            currentUser.enrolledClasses.includes(Number(clase.id))
          );
          this.filterClassesByToday(); // Filtrar las clases por día actual
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

  // Filtrar clases por el día actual
  filterClassesByToday() {
    const todayIndex = new Date().getDay(); // Índice del día actual (0=Domingo, 1=Lunes, etc.)
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    this.todayName = days[todayIndex]; // Asigna el nombre del día actual
    this.filteredClases = this.clases.filter((clase) =>
      clase.schedule.some((sched: any) => sched.dayId == todayIndex)
    );

    // Añadir horarios y aulas a las clases filtradas
    this.filteredClases.forEach((clase) => {
      const schedule = clase.schedule.find((sched: any) => sched.dayId == todayIndex);
      clase.timeBlockIds = schedule?.timeBlockIds || [];
      const classroom = this.classrooms.find((room) => room.id == clase.classroomId);
      clase.classroomCode = classroom ? classroom.code : 'Sin sala';
    });
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

  // Cargar las aulas
  loadClassrooms() {
    this.apiService.getClassrooms().subscribe({
      next: (classrooms) => {
        this.classrooms = classrooms;
        this.filterClassesByToday(); // Refresca la información de las clases filtradas
      },
      error: (err) => {
        console.error('Error al cargar aulas:', err);
        this.presentToast('Error al cargar aulas');
      },
    });
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

  // Mostrar notificación
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
    });
    toast.present();
  }
}
