import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  
  constructor(private authService:AuthService, private router: Router) {
    this.router.navigate(['home/perfil'])
  }
  segmentChanged($event: any){
    console.log($event.detail.value);
    let direction=$event.detail.value
    this.router.navigate(['home/'+direction])
  }
  logOut(){
    this.authService.removeToken();
    this.router.navigate(['/login']);
  }
}