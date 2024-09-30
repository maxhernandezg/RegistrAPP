import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authTokenKey="authToken";

  constructor() { }

  storeToken(token:string):void{
    const encodedToken = btoa(token);
    localStorage.setItem(this.authTokenKey,encodedToken);

  }

  isAuthenticated():boolean{
    const token = localStorage.getItem(this.authTokenKey);
    return !!token;
  }

  removeToken():void{
    localStorage.removeItem(this.authTokenKey);
  }
}
