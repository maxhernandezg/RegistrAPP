import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000'; // Base URL del JSON Server

  constructor(private http: HttpClient) {}

  // LOGIN //
  login(username: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/users?username=${username}&password=${password}`;
    return this.http.get<any[]>(url).pipe(
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
    return this.http.get<any>(url).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  // ASISTENCIA //

  // Obtener todas las clases
  getClasses(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/classes`).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  // Registrar asistencia
  registerAttendance(attendance: any): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(`${this.apiUrl}/attendance`, attendance, { headers }).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  // Obtener clases por enrolledClasses de un usuario
  getClassesByEnrolled(enrolledClasses: number[]): Observable<any[]> {
    const url = `${this.apiUrl}/classes?${enrolledClasses.map(id => `id=${id}`).join('&')}`;
    console.log('URL generada:', url); // Debug para verificar la URL
    return this.http.get<any[]>(url).pipe(
      catchError((error) => this.handleError(error))
    );
  }
  
  
  

  // Obtener asistencias por usuario
  getAttendanceByUser(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/attendance?userId=${userId}`).pipe(
      catchError((error) => this.handleError(error))
    );
  }

  deleteAttendance(id: string): Observable<any> {
    const url = `${this.apiUrl}/attendance/${id}`;
    console.log('URL de eliminación de asistencia:', url); // Debug
    return this.http.delete<any>(url).pipe(
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

  // clases //
  // Obtener clases por ID del profesor
getClassesByTeacher(teacherId: number): Observable<any[]> {
  const url = `${this.apiUrl}/classes?teacherId=${teacherId}`;
  return this.http.get<any[]>(url).pipe(
    catchError((error) => this.handleError(error))
  );
}
updateClass(classId: number, updatedClass: any): Observable<any> {
  const url = `${this.apiUrl}/classes/${classId}`;
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  return this.http.put<any>(url, updatedClass, { headers }).pipe(
    catchError((error) => this.handleError(error))
  );
}
createClass(clase: any): Observable<any> {
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  return this.http.post<any>(`${this.apiUrl}/classes`, clase, { headers }).pipe(
    catchError((error) => this.handleError(error))
  );
}
deleteClassWithAttendance(classId: number): Observable<any> {
  return this.http.get<any[]>(`${this.apiUrl}/attendance?classId=${classId}`).pipe(
    map((attendances) => {
      const deleteRequests = attendances.map((attendance) =>
        this.http.delete(`${this.apiUrl}/attendance/${attendance.id}`).toPromise()
      );

      return Promise.all(deleteRequests).then(() =>
        this.http.delete(`${this.apiUrl}/classes/${classId}`).toPromise()
      );
    }),
    catchError((error) => {
      console.error('Error al eliminar clase y asistencias:', error);
      return throwError(() => new Error('Error al eliminar clase y asistencias'));
    })
  );
}
}
