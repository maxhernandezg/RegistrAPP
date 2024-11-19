import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-perfil-docente',
  templateUrl: './perfil-docente.component.html',
  styleUrls: ['./perfil-docente.component.scss'],
})
export class PerfilDocenteComponent implements OnInit {
  docente: any = null; // Contendrá los datos del docente

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.loadDocenteData();
  }

  // Cargar los datos del docente autenticado
  loadDocenteData() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser && currentUser.role === 'docente') {
      this.docente = currentUser; // Asigna los datos del docente
    } else {
      console.warn('Usuario no autorizado o no es un docente.');
    }
  }
}
