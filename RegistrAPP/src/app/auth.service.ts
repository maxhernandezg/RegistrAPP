import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authTokenKey = 'authToken';
  private currentUserKey = 'currentUser'; // Nueva clave para guardar el usuario actual

  constructor() {}

  // Almacenar el token en localStorage (codificado en Base64)
  storeToken(token: string): void {
    const encodedToken = btoa(token); // Codificar el token en Base64
    localStorage.setItem(this.authTokenKey, encodedToken);
  }

  // Obtener el token decodificado desde localStorage
  getToken(): string | null {
    const encodedToken = localStorage.getItem(this.authTokenKey);
    return encodedToken ? atob(encodedToken) : null; // Decodificar el token si existe
  }

  // Guardar el usuario actual en localStorage
  storeUser(user: any): void {
    localStorage.setItem(this.currentUserKey, JSON.stringify(user));
  }

  // Obtener el usuario actual desde localStorage
  getCurrentUser(): any {
    const user = localStorage.getItem(this.currentUserKey);
    return user ? JSON.parse(user) : null; // Retorna el usuario o null si no existe
  }

  // Verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    const token = this.getToken(); // Verificar si hay un token válido
    return !!token;
  }

  // Eliminar el token y el usuario del almacenamiento local
  removeToken(): void {
    localStorage.removeItem(this.authTokenKey);
    localStorage.removeItem(this.currentUserKey);
  }
}
