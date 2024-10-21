// src/app/services/api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/users'; // Base URL del JSON Server

  constructor(private http: HttpClient) {}

  // Método de inicio de sesión
  login(username: string, password: string): Observable<any> {
    const url = `${this.apiUrl}?username=${username}&password=${password}`;
    return this.http.get<any[]>(url).pipe(
      map((users) => {
        if (users.length > 0) {
          return users[0]; // Devuelve el primer usuario encontrado
        } else {
          throw new Error('Credenciales incorrectas');
        }
      }),
      catchError(() => throwError(() => new Error('Error de autenticación')))
    );
  }

  // Leer todos los usuarios
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  // Obtener un usuario por ID
  getUserById(userId: number): Observable<any> {
    const url = `${this.apiUrl}/${userId}`;
    return this.http.get<any>(url).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  // Crear un nuevo usuario
  createUser(user: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(this.apiUrl, user, { headers }).pipe(
      catchError((error) => this.handleError(error))
    );
  }
  

  // Actualizar un usuario existente
updateUser(id: string, user: any): Observable<any> {
  const url = `${this.apiUrl}/${id}`; // Usar el 'id' del usuario
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  console.log('Actualizando usuario:', user); // Para debug
  console.log('URL:', url); // Asegúrate de que la URL sea correcta

  return this.http.put<any>(url, user, { headers }).pipe(
    catchError((error) => {
      console.error('Error en la actualización:', error);
      return this.handleError(error); // Manejo de errores
    })
  );
}



// Eliminar un usuario por ID
deleteUser(userId: string): Observable<any> {
  const url = `${this.apiUrl}/${userId}`; // URL correcta
  console.log('URL de eliminación:', url); // Debug

  return this.http.delete<any>(url).pipe(
    catchError((error) => {
      console.error('Error en el servicio al eliminar:', error);
      return throwError(() => new Error('Error en la eliminación del usuario'));
    })
  );
}




  

  // Manejo de errores
  private handleError(error: any): Observable<never> {
    console.error('Ocurrió un error:', error);
    return throwError(() => new Error('Ocurrió un error en la operación'));
  }
}
