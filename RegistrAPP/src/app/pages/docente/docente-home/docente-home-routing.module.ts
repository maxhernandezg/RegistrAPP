import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocenteHomePage } from './docente-home.page';
import { AsistenciaComponent } from 'src/app/asistencia/asistencia.component'; // Importar el componente
import { ClasesComponent } from 'src/app/clases/clases.component';
import { RegistroAsistenciaComponent } from 'src/app/registro-asistencia/registro-asistencia.component';
import { PerfilDocenteComponent } from 'src/app/perfil-docente/perfil-docente.component';

const routes: Routes = [
  {
    path: '',
    component: DocenteHomePage,
    children: [
      {
        path: 'clases',
        component: ClasesComponent,
      },
      {
        path: 'registro-asistencia',
        component: RegistroAsistenciaComponent,
      },
      {
        path: 'perfil-docente',
        component:PerfilDocenteComponent,
      },
      {
        path: '',
        redirectTo: 'asistencia',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocenteHomeRoutingModule {}
