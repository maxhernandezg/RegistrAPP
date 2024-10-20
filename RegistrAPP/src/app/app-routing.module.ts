import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth-guard.service'; // Verifica que el servicio esté en la ruta correcta

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
    canActivate: [AuthGuardService],
    data: { roles: ['docente', 'student'] }, // Permitir acceso a ambos roles
  },
  {
    path: 'docente-home',
    loadChildren: () =>
      import('./pages/docente/docente-home/docente-home.module').then(
        (m) => m.DocenteHomePageModule
      ),
    canActivate: [AuthGuardService],
    data: { roles: ['docente'] }, // Solo acceso para docentes
  },
  {
    path: 'student-home',
    loadChildren: () =>
      import('./pages/student/student-home/student-home.module').then(
        (m) => m.StudentHomePageModule
      ),
    canActivate: [AuthGuardService],
    data: { roles: ['alumno'] }, // Cambiamos 'student' por 'alumno'
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'reset-password',
    loadChildren: () =>
      import('./reset-password/reset-password.module').then(
        (m) => m.ResetPasswordPageModule
      ),
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'login',
  },  {
    path: 'not-found',
    loadChildren: () => import('./not-found/not-found.module').then( m => m.NotFoundPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule], // Exportar RouterModule para usarlo en otros módulos
})
export class AppRoutingModule {}
