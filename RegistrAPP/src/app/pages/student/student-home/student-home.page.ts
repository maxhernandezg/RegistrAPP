import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.page.html',
  styleUrls: ['./student-home.page.scss'],
})
export class StudentHomePage implements OnInit {
  userName: string = 'Estudiante';

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as { user: { fullName: string } };
    if (state) {
      this.userName = state.user.fullName;
    }
  }

  ngOnInit() {}

  segmentChanged($event: any) {
    console.log($event.detail.value);
    let direction = $event.detail.value;

    // Navegar hacia la ruta seleccionada en el segmento
    this.router.navigate(['student-home/' + direction]);
  }
}
