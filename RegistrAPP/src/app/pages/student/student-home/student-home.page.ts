import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.page.html',
  styleUrls: ['./student-home.page.scss'],
})
export class StudentHomePage implements OnInit {
  userName: string = 'Estudiante';

  constructor(private router: Router, private menu: MenuController) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as { user: { fullName: string } };
    if (state) {
      this.userName = state.user.fullName;
    }
  }

  ngOnInit() {}

  // Abre el menú lateral
  openMenu() {
    this.menu.open('end'); // Asegúrate de que 'end' coincida con la configuración del menú
  }

  segmentChanged(event: any) {
    const selectedSegment = event.detail.value;
    this.router.navigate([`/student-home/${selectedSegment}`]);
  }
}
