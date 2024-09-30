import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate{

  constructor(private authService:AuthService , private router:Router) { }

  canActivate(route : ActivatedRouteSnapshot , state:RouterStateSnapshot):
  Observable<boolean|UrlTree> | Promise<boolean|UrlTree> | boolean | UrlTree
  {
    if(this.authService.isAuthenticated()){
      return true;
    }else{
      this.router.navigate(['/login']);
      return false;
    }
  }
}
