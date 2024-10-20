import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular'; // Asegúrate de importar IonicModule
import { StudentHomePage } from './student-home.page';
import { StudentHomeRoutingModule } from './student-home-routing.module'; // Corrige el nombre

@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    StudentHomeRoutingModule,
  ],
  declarations: [StudentHomePage],
})
export class StudentHomePageModule {}
