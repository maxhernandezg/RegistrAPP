import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DocenteHomePage } from './docente-home.page';

const routes: Routes = [
  {
    path: '',
    component: DocenteHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocenteHomePageRoutingModule {}
