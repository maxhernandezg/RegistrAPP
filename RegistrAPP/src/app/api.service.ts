import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'https://c5d221d1-16cd-488f-bcc7-0c33e0470d36-00-16s3kkfehbs6e.worf.replit.dev'; // Base URL del JSON Server

  // Opciones de encabezados para las peticiones HTTP
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json', // Define el tipo de contenido como JSON
      'Access-Control-Allow-Origin': '*', // Permite solicitudes desde cualquier origen
    }),
  };

  constructor(private http: HttpClient) {}

  // LOGIN //
  login(username: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/users?username=${username}&password=${password}`;
    return this.http.get<any[]>(url, {headers: this.httpOptions.headers}).pipe(
      map((users) => {
        if (users.length > 0) {
          return users[0]; // Retorna el primer usuario encontrado
        } else {
          throw new Error('Credenciales incorrectas');
        }
      }),
      catchError(() => throwError(() => new Error('Error de autenticación')))
    );
  }

  // Obtener un usuario por ID
  getUserById(userId: number): Observable<any> {
    const url = `${this.apiUrl}/users/${userId}`;
    return this.http.get<any>(url, {headers: this.httpOptions.headers}).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  // ASISTENCIA //

  // Obtener todas las clases
  getClasses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/classes`, {headers: this.httpOptions.headers}).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  // Obtener bloques horarios
  getTimeBlocks(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/timeBlocks`, {headers: this.httpOptions.headers}).pipe(
      catchError((error) => {
        console.error('Error al obtener bloques horarios:', error);
        throw error;
      })
    );
  }

  // Registrar asistencia
  registerAttendance(attendance: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/attendance`, attendance, {headers: this.httpOptions.headers}).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  // Obtener clases por enrolledClasses de un usuario
  getClassesByEnrolled(enrolledClasses: number[]): Observable<any[]> {
    const url = `${this.apiUrl}/classes?${enrolledClasses.map((id) => `id=${id}`).join('&')}`;
    console.log('URL generada:', url); // Debug para verificar la URL
    return this.http.get<any[]>(url, {headers: this.httpOptions.headers}).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  // Obtener asistencias por usuario
  getAttendanceByUser(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/attendance?userId=${userId}`, {headers: this.httpOptions.headers}).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  // Eliminar asistencia
  deleteAttendance(id: string): Observable<any> {
    const url = `${this.apiUrl}/attendance/${id}`;
    console.log('URL de eliminación de asistencia:', url); // Debug
    return this.http.delete<any>(url, {headers: this.httpOptions.headers}).pipe(
      catchError((error) => {
        console.error('Error al eliminar asistencia:', error);
        return throwError(() => new Error('Error al eliminar asistencia'));
      })
    );
  }

  // MANEJO DE ERRORES //
  private handleError(error: any): Observable<never> {
    console.error('Ocurrió un error:', error);
    return throwError(() => new Error('Ocurrió un error en la operación'));
  }

  // CLASES //

  // Obtener días
  getDays(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/days`, {headers: this.httpOptions.headers}).pipe(
      catchError((error) => {
        console.error('Error al obtener días:', error);
        throw error;
      })
    );
  }

  // Obtener aulas
  getClassrooms(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/classrooms`, {headers: this.httpOptions.headers}).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  // Obtener clases por ID del profesor
  getClassesByTeacher(teacherId: number): Observable<any[]> {
    const url = `${this.apiUrl}/classes?teacherId=${teacherId}`;
    console.log('URL generada para obtener clases del profesor:', url); // Depuración
    return this.http.get<any[]>(url, {headers: this.httpOptions.headers}).pipe(
      map((classes) => {
        console.log('Clases filtradas por teacherId:', classes); // Verificar datos recibidos
        return classes;
      }),
      catchError((error) => {
        console.error('Error al obtener clases por teacherId:', error);
        return this.handleError(error);
      })
    );
  }

  // Actualizar clase
  updateClass(classId: number, updatedClass: any): Observable<any> {
    const url = `${this.apiUrl}/classes/${classId}`;
    return this.http.put<any>(url, updatedClass, this.httpOptions).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  // Crear clase
  createClass(clase: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/classes`, clase, this.httpOptions).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  // Eliminar clase y asistencias
  deleteClassWithAttendance(classId: number): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/attendance?classId=${classId}`, this.httpOptions).pipe(
      map((attendances) => {
        const deleteRequests = attendances.map((attendance) =>
          this.http.delete(`${this.apiUrl}/attendance/${attendance.id}`, this.httpOptions).toPromise()
        );

        return Promise.all(deleteRequests).then(() =>
          this.http.delete(`${this.apiUrl}/classes/${classId}`, this.httpOptions).toPromise()
        );
      }),
      catchError((error) => {
        console.error('Error al eliminar clase y asistencias:', error);
        return throwError(() => new Error('Error al eliminar clase y asistencias'));
      })
    );
  }

  // Obtener un bloque horario por ID
  getTimeBlockById(id: number): Observable<any> {
    const url = `${this.apiUrl}/timeBlocks/${id}`;
    return this.http.get<any>(url, this.httpOptions).pipe(
      catchError((error) => this.handleError(error))
    );
  }
  
}
