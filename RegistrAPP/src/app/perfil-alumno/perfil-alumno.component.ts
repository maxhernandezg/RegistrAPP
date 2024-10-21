import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-perfil-alumno',
  templateUrl: './perfil-alumno.component.html',
  styleUrls: ['./perfil-alumno.component.scss'],
})
export class PerfilAlumnoComponent  implements OnInit {

  datosalumno: any [] = [];

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    // Llama al servicio para obtener los datos
    this.apiService.getData().subscribe((data) => {
      this.datosalumno = data;  // Asigna los datos recibidos
    });
  }
}
