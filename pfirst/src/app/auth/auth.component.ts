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

  userEmail : String;
  userPassword : String;

  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(){}

  onSignIn(){
    this.authService.validate(this.userEmail, this.userPassword)
      .then((response) => {
        this.authService.setUserInfo({'user' : response['user']});
        this.router.navigate(['']);

      })
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
