import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage {
  email: string = '';
  currentPassword: string = '';
  newPassword: string = '';
  hidePassword: boolean = true; // Para alternar visibilidad de la contraseña actual
  hideNewPassword: boolean = true; // Para alternar visibilidad de la nueva contraseña

  constructor(
    private apiService: ApiService,
    private toastController: ToastController
  ) {}

  updatePassword() {
    if (!this.email || !this.currentPassword || !this.newPassword) {
      this.presentToast('Por favor, completa todos los campos.');
      return;
    }

    // Buscar el usuario por email
    this.apiService.getUserByEmail(this.email).subscribe({
      next: (user) => {
        if (user.password === this.currentPassword) {
          // Actualizar la contraseña
          const updatedUser = { ...user, password: this.newPassword };
          this.apiService.updateUserPassword(user.id, updatedUser).subscribe({
            next: () => this.presentToast('Contraseña actualizada exitosamente.'),
            error: () => this.presentToast('Error al actualizar la contraseña.'),
          });
        } else {
          this.presentToast('La contraseña actual es incorrecta.');
        }
      },
      error: () => this.presentToast('El correo electrónico no existe.'),
    });
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 3000,
    });
    toast.present();
  }
}
