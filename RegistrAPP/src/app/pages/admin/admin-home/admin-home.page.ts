import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service'; // Importamos el servicio API
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.page.html',
  styleUrls: ['./admin-home.page.scss'],
})
export class AdminHomePage implements OnInit {
  users: any[] = []; // Lista de usuarios
  selectedUser: any = null; // Usuario seleccionado para edición

  // Modelo del formulario
  userForm = {
    id: null,  // Usar 'id' en lugar de 'userId'
    fullName: '',
    email: '',
    username: '',
    password: '',
    role: '',
  };

  constructor(
    private apiService: ApiService, // Inyectamos el servicio API
    public toastController: ToastController
  ) {}

  ngOnInit() {
    this.loadUsers(); // Cargamos los usuarios al iniciar
  }

  // Cargar todos los usuarios
  loadUsers() {
    this.apiService.getUsers().subscribe({
      next: (users) => {
        console.log('Usuarios cargados:', users); // Verificar que los usuarios tienen `userId`
        this.users = users;
      },
      error: (err) => {
        console.error('Error al cargar usuarios:', err);
        this.presentToast('Error al cargar usuarios');
      },
    });
  }

  
  // Guardar o actualizar un usuario
  saveUser() {
    if (this.userForm.id) {
      // Si el ID existe, es una actualización
      console.log('Usuario a actualizar:', this.userForm); // Debug
  
      this.apiService.updateUser(this.userForm.id, this.userForm).subscribe({
        next: () => {
          this.presentToast('Usuario actualizado correctamente');
          this.resetForm(); // Limpia el formulario después de actualizar
          this.loadUsers(); // Recarga la lista de usuarios
        },
        error: (error) => {
          console.error('Error al actualizar usuario:', error);
          this.presentToast('Error al actualizar usuario');
        },
      });
    } else {
      // Si no hay ID, es un nuevo usuario
      console.log('Usuario a crear:', this.userForm); // Debug
  
      this.apiService.createUser(this.userForm).subscribe({
        next: () => {
          this.presentToast('Usuario creado correctamente');
          this.resetForm(); // Limpia el formulario después de crear
          this.loadUsers(); // Recarga la lista de usuarios
        },
        error: (error) => {
          console.error('Error al crear usuario:', error);
          this.presentToast('Error al crear usuario');
        },
      });
    }
  }
  
  
  
  
  selectUser(user: any) {
    this.userForm = { ...user }; // Ahora 'userForm' incluirá 'id'
  }
  
  

  // Eliminar un usuario
  // Eliminar un usuario
deleteUser(user: any) {
  const userId = user.id; // Asegúrate de que se usa 'id'
  if (!userId) {
    this.presentToast('ID de usuario no válido');
    return;
  }

  console.log('ID del usuario a eliminar:', userId); // Debug

  this.apiService.deleteUser(userId).subscribe({
    next: () => {
      this.presentToast('Usuario eliminado correctamente');
      this.loadUsers(); // Recargar la lista de usuarios después de eliminar
    },
    error: (err) => {
      console.error('Error al eliminar usuario:', err);
      this.presentToast('Error al eliminar usuario');
    },
  });
}

  
  
  
  
  // Limpiar el formulario
  resetForm() {
    this.userForm = {
      id: null,  // Limpiar también el 'id'
      fullName: '',
      email: '',
      username: '',
      password: '',
      role: '',
    };
  }

  // Mostrar notificación
  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000,
    });
    toast.present();
  }
}
