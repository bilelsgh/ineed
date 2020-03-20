import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  authStatus: boolean;
  who: string;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(){
    this.authStatus = this.authService.isAuth;
    this.who = this.authService.who;
  }

  onSignIn(){
    this.authService.signIn().then(//car méthode asynchrone
      () => {
        this.authStatus = this.authService.isAuth;
        this.router.navigate( ['']) //redirection après la connection
      }
    );
  }

  onSignOut(){
    this.authService.signOut(); //méthode synchrone ...
    this.authStatus = this.authService.isAuth; //..on met directement à jour le bool
  }

  onSubmit(form: NgForm){
    this.onSignIn();
    /**console.log("RES : " + this.authService.submit(form));
    if (this.authService.submit(form)){
      this.onSignIn();
      this.router.navigate(['']);
    }else{
      alert("Mot de passe ou adresse e-mail invalide.")
    }**/



  }
}
