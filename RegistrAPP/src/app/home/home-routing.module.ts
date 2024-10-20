import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AsistenciaComponent } from '../asistencia/asistencia.component';
import { HomePage } from './home.page';
import { PerfilAlumnoComponent } from '../perfil-alumno/perfil-alumno.component';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [
      {
        path: 'asistencia',
        component: AsistenciaComponent
      },
      {
        path: 'perfil-alumno',
        component: PerfilAlumnoComponent
      },
      {
        path: '', 
        redirectTo: 'asistencia',  // Redireccionar a "asistencia" por defecto cuando se accede a 'home'
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
