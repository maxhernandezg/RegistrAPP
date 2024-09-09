import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
// Importar Angular Material
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ResetPasswordPageRoutingModule } from './reset-password-routing.module';

import { ResetPasswordPage } from './reset-password.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResetPasswordPageRoutingModule,
    MatFormFieldModule,  // Módulo para usar mat-form-field
    MatInputModule,      // Módulo para usar mat-input
    MatButtonModule,     // Módulo para usar botones de Material
    MatIconModule        // Módulo para íconos
  ],
  declarations: [ResetPasswordPage]
})
export class ResetPasswordPageModule {}
