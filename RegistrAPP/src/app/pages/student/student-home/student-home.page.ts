import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.page.html',
  styleUrls: ['./student-home.page.scss'],
})
export class StudentHomePage implements OnInit {
  userName: string = 'Estudiante'; // Nombre del estudiante
  selectedSegment: string = 'asistencia'; // Segmento inicial

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as { user: { fullName: string } };
    if (state) {
      this.userName = state.user.fullName;
    }
  }

  ngOnInit() {}

  // Manejar cambio de segmento
  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
    console.log('Segmento seleccionado:', this.selectedSegment);
  }
}
