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
// Obtener bloques horarios
getTimeBlocks(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/timeBlocks`).pipe(
    catchError((error) => {
      console.error('Error al obtener bloques horarios:', error);
      throw error;
    })
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

  // Obtener días
getDays(): Observable<any[]> {
  return this.http.get<any[]>(`${this.apiUrl}/days`).pipe(
    catchError((error) => {
      console.error('Error al obtener días:', error);
      throw error;
    })
  );
}

// Obtener bloques horarios

  getClassrooms(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/classrooms`).pipe(
      catchError((error) => this.handleError(error))
    );
  }
  // Obtener clases por ID del profesor
  getClassesByTeacher(teacherId: number): Observable<any[]> {
    const url = `${this.apiUrl}/classes?teacherId=${teacherId}`;
    console.log('URL generada para obtener clases del profesor:', url); // Depuración
    return this.http.get<any[]>(url).pipe(
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

getTimeBlockById(id: number): any {
  const timeBlocks = [
    { id: 1, startTime: '08:01', endTime: '08:40' },
    { id: 2, startTime: '08:41', endTime: '09:20' },
    { id: 3, startTime: '09:31', endTime: '10:10' },
    { id: 4, startTime: '10:11', endTime: '10:50' },
    { id: 5, startTime: '11:01', endTime: '11:40' },
    { id: 6, startTime: '11:41', endTime: '12:20' },
    { id: 7, startTime: '12:31', endTime: '13:10' },
    { id: 8, startTime: '13:11', endTime: '13:50' },
    { id: 9, startTime: '14:01', endTime: '14:40' },
    { id: 10, startTime: '14:41', endTime: '15:20' },
    { id: 11, startTime: '15:31', endTime: '16:10' },
    { id: 12, startTime: '16:11', endTime: '16:50' },
    { id: 13, startTime: '17:01', endTime: '17:40' },
    { id: 14, startTime: '17:41', endTime: '18:20' },
  ];
  return timeBlocks.find((block) => block.id === id);
}


}
