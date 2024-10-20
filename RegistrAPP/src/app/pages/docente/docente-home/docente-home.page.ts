import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-docente-home',
  templateUrl: './docente-home.page.html',
  styleUrls: ['./docente-home.page.scss'],
})
export class DocenteHomePage implements OnInit {
  userName: string = 'Docente'; // Nombre por defecto
  selectedSegment: string = 'asistencia'; // Segmento inicial

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as { user: { fullName: string } };
    if (state) {
      this.userName = state.user.fullName; // Asignar nombre desde la sesión
    }
  }

  ngOnInit() {}

  // Manejar cambio de segmento
  segmentChanged(event: any) {
    this.selectedSegment = event.detail.value;
    console.log('Segmento seleccionado:', this.selectedSegment);
  }
}
