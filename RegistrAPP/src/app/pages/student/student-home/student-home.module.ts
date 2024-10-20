// src/app/pages/admin/admin-home/admin-home.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { StudentHomePageRoutingModule } from './student-home-routing.module';
import { StudentHomePage } from './student-home.page';

// Importamos los módulos de Angular Material necesarios
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StudentHomePageRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  declarations: [StudentHomePage]
})
export class StudentHomePageModule {}
