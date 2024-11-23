import { Component, OnInit } from '@angular/core';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { ApiService } from '../api.service';


@Component({
  selector: 'app-abrircamara',
  templateUrl: './abrircamara.component.html',
  styleUrls: ['./abrircamara.component.scss'],
})
export class AbrircamaraComponent implements OnInit {
  scanResult: string | null = null;

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.startScanner();
  }

  startScanner() {
    const html5QrCodeScanner = new Html5QrcodeScanner(
      'reader',
      {
        fps: 10, // Frames per second
        qrbox: { width: 250, height: 250 }, // Tamaño del cuadro de escaneo
      },
      false
    );

    html5QrCodeScanner.render(
      (decodedText: string) => {
        console.log('QR Code detected: ', decodedText);

        // Llama a la función para registrar la asistencia
        this.registerAttendance(decodedText);

        html5QrCodeScanner.clear(); // Detiene el escáner después de leer
      },
      (error: any) => {
        console.warn('QR Code no detectado.', error);
      }
    );
  }

  registerAttendance(qrData: string) {
    try {
      const attendanceData = JSON.parse(qrData); // Convierte el QR a objeto JSON
      console.log('Registrando asistencia con: ', attendanceData);

      this.apiService.registerAttendance(attendanceData).subscribe({
        next: () => {
          console.log('Asistencia registrada correctamente');
          alert('Asistencia registrada exitosamente');
        },
        error: (error) => {
          console.error('Error al registrar asistencia: ', error);
          alert('Error al registrar asistencia');
        },
      });
    } catch (error) {
      console.error('Error al procesar el QR: ', error);
      alert('El código QR no es válido');
    }
  }
}
