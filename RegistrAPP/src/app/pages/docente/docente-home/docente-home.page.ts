import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular'; // Importa MenuController

@Component({
  selector: 'app-docente-home',
  templateUrl: './docente-home.page.html',
  styleUrls: ['./docente-home.page.scss'],
})
export class DocenteHomePage implements OnInit {
  userName: string = 'Docente';

  constructor(private router: Router, private menu: MenuController) { // Añade MenuController al constructor
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as { user: { fullName: string } };
    if (state) {
      this.userName = state.user.fullName;
    }
  }

  ngOnInit() {}

  // Método para abrir el menú lateral
  openMenu() {
    this.menu.open('end'); // Asegúrate de que 'end' coincide con la configuración del menú
  }

  segmentChanged(event: any) {
    const selectedSegment = event.detail.value;
    this.router.navigate([`/docente-home/${selectedSegment}`]);
  }
}
