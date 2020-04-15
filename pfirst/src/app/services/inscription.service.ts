import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {Router} from "@angular/router";

@Injectable()

export class InscriptionService{

  users = new Array<{firstName: string, lastName: string, sex: string, mail: string, password: string}>();

  constructor(private httpClient: HttpClient, private auth : AuthService, private router : Router) {}


  addUser(nom: string, prenom: string, sexe: string, mail: string, password: string, ){
      const newUser = {firstName: '', lastName: '', sex: '', mail:'', password:''};
      newUser.firstName = prenom;
      newUser.lastName = nom;
      newUser.sex = sexe;
      newUser.mail = mail;
      newUser.password = password;
      this.users.push(newUser);
      console.log(newUser + "#");

    this.httpClient
      .post(this.auth.backend + 'api/user', newUser)
      .subscribe(
        (token) => {
          //RÉCEPTION DU TOKEN PAR LE BACKEND ET LE METTRE DANS LOCAL
          console.log("#Inscription réussie : " + token);
          this.auth.setUserInfo(token); //stocke le tocken dans le session/localStorage
          this.router.navigate(['']);

        },
        (error) => {
          console.log('Erreur lors de linscription: ' + error);
        }
      );
    }



  getFromServer(){
    this.httpClient
      .get<any[]>(this.auth.backend+"users.json")
      .subscribe(
        (response) => {
          this.users = response;
        },
        (error) => {
          console.log("Erreur de chargement : " + error);
        }
      );
  }

}


