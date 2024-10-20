import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'; // Asegúrate de importar IonicModule
import { DocenteHomePage } from './docente-home.page';
import { DocenteHomeRoutingModule } from './docente-home-routing.module'; // Corrige el nombre

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    DocenteHomeRoutingModule,
  ],
  declarations: [DocenteHomePage],
})
export class DocenteHomePageModule {}
