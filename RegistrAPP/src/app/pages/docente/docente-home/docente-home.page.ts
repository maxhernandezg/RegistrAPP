import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-docente-home',
  templateUrl: './docente-home.page.html',
  styleUrls: ['./docente-home.page.scss'],
})
export class DocenteHomePage implements OnInit {
  userName: string = 'Docente';

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras?.state as { user: { fullName: string } };
    if (state) {
      this.userName = state.user.fullName;
    }
  }

  ngOnInit() {}

  segmentChanged(event: any) {
    const selectedSegment = event.detail.value;
    this.router.navigate([`/docente-home/${selectedSegment}`]);
  }
}
