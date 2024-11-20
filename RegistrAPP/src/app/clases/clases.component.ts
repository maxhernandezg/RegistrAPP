import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

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
  newClass: any = { className: '', teacherId: null, schedule: [] };
  teacherId: number | null = null;
  todayName: string = '';
  days: any[] = [];
  timeBlocks: any[] = [];
  schedule: { [key: string]: string[] } = {}; // Define schedule como un objeto con claves string y valores string[]

  availableDays = [
    { id: 0, name: 'Domingo' },
    { id: 1, name: 'Lunes' },
    { id: 2, name: 'Martes' },
    { id: 3, name: 'Miércoles' },
    { id: 4, name: 'Jueves' },
    { id: 5, name: 'Viernes' },
    { id: 6, name: 'Sábado' },
  ];

  qrCodeData: string = ''; // Dato del QR generado

  constructor(
    private apiService: ApiService,
    private router: Router,
    private authService: AuthService,
    public toastController: ToastController
  ) {}

  ngOnInit() {
    this.initializeTeacherId();
    this.loadClasses();
    this.loadClassrooms();
    this.setTodayName();
    this.loadDays();
    this.loadTimeBlocks();
  }

  setTodayName() {
    const days = [
      'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado',
    ];
    const today = new Date();
    this.todayName = days[today.getDay()];
  }

  getDayName(dayId: number): string {
    const days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    return days[dayId] || 'Día desconocido';
  }

  getTimeBlock(blockId: number): string {
    const block = this.timeBlocks.find((b) => b.id === blockId); // Busca el bloque horario en la lista
    return block ? `${block.startTime} - ${block.endTime}` : 'Bloque desconocido'; // Devuelve la hora o mensaje
  }
  
  loadTimeBlocks() {
    this.apiService.getTimeBlocks().subscribe({
      next: (blocks) => {
        // Asegura que los IDs sean numéricos
        this.timeBlocks = blocks.map((block) => ({
          ...block,
          id: Number(block.id),
        }));
        console.log('Bloques horarios cargados:', this.timeBlocks); // Debug
      },
      error: (error) => {
        console.error('Error al cargar bloques horarios:', error);
        this.presentToast('Error al cargar bloques horarios');
      },
    });
  }
  
  loadClasses() {
    if (!this.teacherId) {
      console.error('No se pudo cargar el teacherId del usuario.');
      return;
    }
  
    this.apiService.getClassesByTeacher(this.teacherId).subscribe({
      next: (clases) => {
        this.clases = clases.map((clase) => {
          // Convierte timeBlockIds a números y prepara el horario
          clase.schedule.forEach((sched: any) => {
            sched.timeBlockIds = sched.timeBlockIds.map((id: any) => Number(id));
          });
          return clase;
        });
        this.filterClassesByToday(); // Filtra por el día actual
      },
      error: (error) => {
        console.error('Error al cargar clases:', error);
        this.presentToast('Error al cargar clases');
      },
    });
  }
  
  // Filtra clases por el día actual
  filterClassesByToday() {
    const todayIndex = new Date().getDay();
    this.todayName = this.availableDays[todayIndex].name; // Asigna el nombre del día actual
    this.filteredClases = this.clases.filter((clase) =>
      clase.schedule.some((sched: any) => sched.dayId === todayIndex)
    );
  
    this.filteredClases.forEach((clase) => {
      const schedule = clase.schedule.find((sched: any) => sched.dayId === todayIndex);
      clase.timeBlockIds = schedule?.timeBlockIds || []; // Obtiene los bloques horarios para el día actual
      const classroom = this.classrooms.find((room) => room.id == clase.classroomId);
      clase.classroomCode = classroom ? `${classroom.code} - ${classroom.name}` : 'Sin sala';
    });
  }
  

  isLastBlock(blockIds: number[], blockId: number): boolean {
    return blockIds[blockIds.length - 1] === blockId;
  }

  loadDays() {
    this.apiService.getDays().subscribe({
      next: (days) => {
        this.days = days;
      },
      error: (error) => {
        console.error('Error al cargar días:', error);
      },
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
  

  loadClassrooms() {
    // Cargar todas las salas
    this.apiService.getClassrooms().subscribe({
      next: (classrooms) => {
        this.classrooms = classrooms;
  
        // Asocia las salas con las clases ya cargadas
        this.updateClassroomsForClasses();
      },
      error: (error) => {
        console.error('Error al cargar aulas:', error);
        this.presentToast('Error al cargar aulas');
      },
    });
  }
  
  updateClassroomsForClasses() {
    if (this.clases.length > 0 && this.classrooms.length > 0) {
      this.clases.forEach((clase) => {
        const classroom = this.classrooms.find((room) => room.id === clase.classroomId);
        clase.classroomCode = classroom ? `${classroom.code} - ${classroom.name}` : 'Sin sala asignada';
      });
    }
  }

  generateQR(classId: number) {
    const attendanceData = {
      classId: classId,
      timestamp: new Date().toISOString(),
      token: 'secureToken123', // Puedes cambiar esto por un token generado dinámicamente
    };

    const qrCodeData = JSON.stringify(attendanceData);

    // Navegar al componente RegistroAsistencia y enviar los datos del QR
    this.router.navigate(['/docente-home/registro-asistencia'], {
      state: { qrCodeData },
    });
  }
  createClass() {
    if (this.newClass.className.trim() === '') {
      this.presentToast('El nombre de la clase no puede estar vacío');
      return;
    }
  
    // Construye el objeto de la nueva clase con sala y horario
    this.newClass.schedule = Object.keys(this.schedule).map((dayId: string) => ({
      dayId: parseInt(dayId, 10), // Convierte el dayId a número
      timeBlockIds: this.schedule[dayId].map((blockId) => parseInt(blockId, 10)), // Convierte los bloques horarios a números
    }));
  
    // Llamada al servicio para crear la clase
    this.apiService.createClass(this.newClass).subscribe({
      next: () => {
        this.presentToast('Clase creada exitosamente');
        this.loadClasses();
        this.newClass = { className: '', teacherId: this.teacherId }; // Limpia los datos de la clase
        this.schedule = {}; // Reinicia el horario
      },
      error: (error) => {
        console.error('Error al crear clase:', error);
        this.presentToast('Error al crear clase');
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
