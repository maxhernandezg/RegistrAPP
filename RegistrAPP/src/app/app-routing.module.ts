import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth-guard.service'; // Asegúrate de que la ruta sea correcta


const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
    canActivate: [AuthGuardService],
    data: { roles: ['docente', 'student'] },
  },
  {
    path: 'docente-home',
    loadChildren: () =>
      import('./pages/docente/docente-home/docente-home.module').then(
        (m) => m.DocenteHomePageModule
      ),
    canActivate: [AuthGuardService],
    data: { roles: ['docente'] },
  },
  {
    path: 'student-home',
    loadChildren: () =>
      import('./pages/student/student-home/student-home.module').then(
        (m) => m.StudentHomePageModule
      ),
    canActivate: [AuthGuardService],
    data: { roles: ['student'] },
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
  },
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule], // Asegúrate de que RouterModule esté exportado
})
export class AppRoutingModule {} // Asegúrate de exportar AppRoutingModule
