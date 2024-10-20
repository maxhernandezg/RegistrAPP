import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentHomePage } from './student-home.page';
import { AsistenciaComponent } from 'src/app/asistencia/asistencia.component'; // Importar el componente
import { AbrircamaraComponent } from 'src/app/abrircamara/abrircamara.component';

const routes: Routes = [
  {
    path: '',
    component: StudentHomePage,
    children: [
      {
        path: 'asistencia',
        component: AsistenciaComponent,
      },
      {
        path: 'abrircamara',
        component: AbrircamaraComponent,
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
export class StudentHomeRoutingModule {}
