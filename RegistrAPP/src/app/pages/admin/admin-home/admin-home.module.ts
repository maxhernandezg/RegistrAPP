import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AdminHomeRoutingModule } from './admin-home-routing.module'; // Importación corregida
import { AdminHomePage } from './admin-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminHomeRoutingModule, // Importación corregida
  ],
  declarations: [AdminHomePage],
})
export class AdminHomePageModule {}
