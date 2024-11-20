import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro-asistencia',
  templateUrl: './registro-asistencia.component.html',
  styleUrls: ['./registro-asistencia.component.scss'],
})
export class RegistroAsistenciaComponent implements OnInit {
  qrCodeData: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    // Obtener los datos del estado de navegación
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as { qrCodeData: string };
    this.qrCodeData = state?.qrCodeData || '';
  }
}
