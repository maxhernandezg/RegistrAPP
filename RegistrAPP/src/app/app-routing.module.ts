import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth-guard.service'; // Verifica que el servicio esté en la ruta correcta

const routes: Routes = [
  // Ruta accesible para todos los roles
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
    canActivate: [AuthGuardService],
    data: { roles: ['docente', 'alumno'] }, // Permitir acceso a docentes y alumnos
  },
  // Ruta exclusiva para docentes
  {
    path: 'docente-home',
    loadChildren: () =>
      import('./pages/docente/docente-home/docente-home.module').then(
        (m) => m.DocenteHomePageModule
      ),
    canActivate: [AuthGuardService],
    data: { roles: ['docente'] }, // Solo acceso para usuarios con rol 'docente'
  },
  // Ruta exclusiva para alumnos
  {
    path: 'student-home',
    loadChildren: () =>
      import('./pages/student/student-home/student-home.module').then(
        (m) => m.StudentHomePageModule
      ),
    canActivate: [AuthGuardService],
    data: { roles: ['alumno'] }, // Solo acceso para usuarios con rol 'alumno'
  },
  // Ruta de inicio de sesión
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  // Ruta para restablecer contraseña
  {
    path: 'reset-password',
    loadChildren: () =>
      import('./reset-password/reset-password.module').then(
        (m) => m.ResetPasswordPageModule
      ),
  },
  // Ruta por defecto (redirige a login)
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  // Ruta para páginas no encontradas
  {
    path: '**',
    loadChildren: () =>
      import('./not-found/not-found.module').then((m) => m.NotFoundPageModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule], // Exportar RouterModule para usarlo en otros módulos
})
export class AppRoutingModule {}
