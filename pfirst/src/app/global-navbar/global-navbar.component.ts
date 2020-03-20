import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-global-navbar',
  templateUrl: './global-navbar.component.html',
  styleUrls: ['./global-navbar.component.css']
})
export class GlobalNavbarComponent implements OnInit {

  authStatus: boolean;
  constructor(private authService: AuthService) {}

  ngOnInit(){
    this.authStatus = this.authService.isAuth;
  }

  onSignOut(){
    this.authService.signOut(); //méthode synchrone ...
    this.authStatus = this.authService.isAuth; //..on met directement à jour le bool
  }
}
