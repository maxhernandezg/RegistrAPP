import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DocenteHomePageRoutingModule } from './docente-home-routing.module';

import { DocenteHomePage } from './docente-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DocenteHomePageRoutingModule
  ],
  declarations: [DocenteHomePage]
})
export class DocenteHomePageModule {}
