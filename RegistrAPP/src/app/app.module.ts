import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

// Importar ApiService (asegúrate que la ruta sea correcta)
import { ApiService } from './api.service';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AbrircamaraComponent } from './abrircamara/abrircamara.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; // Import correcto para animaciones

@NgModule({
  declarations: [AppComponent, AbrircamaraComponent], // Declara los componentes que pertenecen al módulo
  imports: [
    BrowserModule, 
    HttpClientModule, 
    IonicModule.forRoot(), 
    AppRoutingModule, 
    BrowserAnimationsModule // Agregado para soporte de animaciones
  ],
  providers: [
    ApiService, // Asegura que el servicio esté registrado como proveedor
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideAnimationsAsync() // Reutilización de rutas específica de Ionic
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent], // Componente raíz que se carga al inicio
})
export class AppModule {}
