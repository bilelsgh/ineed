import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {


  constructor(public authService: AuthService, private router: Router, private httpClient: HttpClient) {}

  ngOnInit() {}

  onSignIn(mail: string, password: string) {
    // PASSPORT
    this.authService.validate(mail, password)
      .then((response) => {
        this.authService.setUserInfo({user : response['user']});
        this.router.navigate(['']);

      });
  }

  onSubmit(form: NgForm) {
    this.onSignIn(form.value.mail, form.value.password); // PASSPORT

    // CRÉATION D'UN USER À ENVOYER AU BACKEND
    let current_user =  new Array<{mail: string, password: string}>();
    current_user['mail'] = form.value['mail'];
    current_user['password'] = form.value['password'];

    // ENVOIE AU BACKEND LES INFOS DE CONNEXION
    this.httpClient
      .post(this.authService.backend + 'api/user/login', current_user)
      .subscribe(
        () => {
          console.log('#DEBUG Envoie des infos de connexion : OK');
        },
        (error) => {
          console.log('Erreur : ' + error);
        }
      );




  }
}
