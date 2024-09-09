import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  usuario: string = ''; // Declarar la variable para almacenar el nombre del usuario

  constructor(public alertController: AlertController, private activeroute: ActivatedRoute, private router: Router) {
    // Suscribirse a los parámetros de la ruta para obtener el estado
    this.activeroute.queryParams.subscribe(params => {
      const navigation = this.router.getCurrentNavigation();
      
      // Verificar si el estado y el campo 'user' están presentes
      if (navigation && navigation.extras && navigation.extras.state && navigation.extras.state['user']) {
        this.usuario = navigation.extras.state['user']; // Asignar el nombre del usuario
      }
    });
  }

  ngOnInit() {}
}
