import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DocenteHomePage } from './docente-home.page';
import { AsistenciaComponent } from 'src/app/asistencia/asistencia.component'; // Importar el componente

const routes: Routes = [
  {
    path: '',
    component: DocenteHomePage,
    children: [
      {
        path: 'asistencia',
        component: AsistenciaComponent,
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
