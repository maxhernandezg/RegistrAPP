import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';
// Importar ApiService (asegúrate que la ruta sea correcta)
import { ApiService } from './api.service';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AbrircamaraComponent } from './abrircamara/abrircamara.component';
import { AsistenciaComponent } from './asistencia/asistencia.component';
import { AppRoutingModule } from './app-routing.module';
import { QRCodeModule } from 'angularx-qrcode'; // Importa el módulo
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; // Import correcto para animaciones
import { ClasesComponent } from './clases/clases.component';
import { PerfilDocenteComponent } from './perfil-docente/perfil-docente.component'; // Ajusta la ruta
import { PerfilAlumnoComponent } from './perfil-alumno/perfil-alumno.component'; // Ajusta la ruta según tu estructura

@NgModule({
  declarations: [AppComponent,
                 AbrircamaraComponent,
                 AsistenciaComponent, 
                 ClasesComponent, 
                 PerfilDocenteComponent,
                 PerfilAlumnoComponent,], // Declara los componentes que pertenecen al módulo
  imports: [
    BrowserModule, 
    HttpClientModule, 
    IonicModule.forRoot(),
    FormsModule, 
    AppRoutingModule, 
    BrowserAnimationsModule, // Agregado para soporte de animaciones
    QRCodeModule, // Agrega el módulo aquí
  ],
  providers: [
    ApiService, // Asegura que el servicio esté registrado como proveedor
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideAnimationsAsync() // Reutilización de rutas específica de Ionic
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent], // Componente raíz que se carga al inicio
})
export class AppModule {}
