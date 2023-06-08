import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  loggedIn:boolean=this.authService.isLoggedIn();
  // isAdmin:boolean=this.authService.getRoleFromToken();
  constructor(private authService:AuthService){
    this.loggedIn=this.authService.isLoggedIn();
    // this.loggedIn=this.authService.getRoleFromToken();
  }
  logout(){
    this.loggedIn=false;
    this.authService.signOut();
  }
}
