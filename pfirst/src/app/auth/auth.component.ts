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
  field_non_valid : boolean = false;


  ngOnInit() {
    this.field_non_valid = false;
  }

  onSignIn(mail: string, password: string) {
    /*Envoie du mail et mdp au backend et réception du token de l'user correspondant*/
    this.httpClient
      .post(this.authService.backend + 'api/user/login', {mail: mail, password: password})
      .subscribe(
        (token) => {
          console.log("#Connexion réussie : " + token);
          this.authService.setUserInfo(token); //stocke le token dans le session/localStorage
          this.router.navigate(['']);
        },
        (error) => {
          console.log('Erreur lors de la connexion: ' + error);
        }
      );


     //PASSPORT à enlever éventuellement
    /*this.authService.validate(mail, password)
      .then((response) => {
        this.authService.setUserInfo({user : response['user']}); //mettre le token ici
        this.router.navigate(['']);
      });*/
  }

  onSubmit(form: NgForm) {
    if (this.testMail(form.value['mail'])){
      this.onSignIn(form.value.mail, form.value.password); // PASSPORT
    }else{
      this.field_non_valid = true;
      form.reset();
    }

/* Peut être inutile car déja fait dans validate ci dessus, à vérifier ...
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
          //RÉCEPTION DU TOKEN PAR LE BACKEND ET LE METTRE DANS LOCAL STORAGE
        },
        (error) => {
          console.log('Erreur : ' + error);
        }
      );
 */

  }

  testMail(mail:string){
    for(let elt of mail){
      if(elt === '@'){
        return true;
      }
    }
    return false;
  }
}
