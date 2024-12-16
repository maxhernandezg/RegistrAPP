import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { QRCodeModule } from 'angularx-qrcode';

// Servicios y Componentes
import { ApiService } from './api.service';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AbrircamaraComponent } from './abrircamara/abrircamara.component';
import { AsistenciaComponent } from './asistencia/asistencia.component';
import { ClasesComponent } from './clases/clases.component';
import { PerfilDocenteComponent } from './perfil-docente/perfil-docente.component';
import { PerfilAlumnoComponent } from './perfil-alumno/perfil-alumno.component';
import { RegistroAsistenciaComponent } from './registro-asistencia/registro-asistencia.component';

@NgModule({
  declarations: [
    AppComponent,
    AbrircamaraComponent,
    AsistenciaComponent,
    ClasesComponent,
    PerfilDocenteComponent,
    PerfilAlumnoComponent,
    RegistroAsistenciaComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(),
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    QRCodeModule, // Modulo para QR codes
  ],
  providers: [
    ApiService, // Proveedor del servicio API
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, // Estrategia de reutilización de rutas específica de Ionic
    { provide: LocationStrategy, useClass: HashLocationStrategy }, // Soporte para HashLocationStrategy
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent], // Componente raíz que se carga al inicio
})
export class AppModule {}
