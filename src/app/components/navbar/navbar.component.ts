import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  loggedIn:boolean=this.authService.isLoggedIn();
  constructor(private authService:AuthService){
    this.loggedIn=this.authService.isLoggedIn();
  }
  logout(){
    this.loggedIn=false;
    this.authService.signOut();
  }
}
