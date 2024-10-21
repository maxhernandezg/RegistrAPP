import { Component } from '@angular/core';
import { Camera, CameraResultType } from '@capacitor/camera';

@Component({
  selector: 'app-abrircamara',
  templateUrl: './abrircamara.component.html',
  styleUrls: ['./abrircamara.component.scss'],
})
export class AbrircamaraComponent {
  imageUrl: string | undefined;

  async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
    });

    this.imageUrl = image.webPath; // Asignar la URL de la imagen capturada
    console.log('Imagen capturada:', this.imageUrl);
  }
}
