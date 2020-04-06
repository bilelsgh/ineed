import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';

@Injectable()

export class InscriptionService{

  users = new Array<{firstName: string, lastName: string, sex: string, mail: string, password: string}>();

  constructor(private httpClient: HttpClient, private auth : AuthService) {}


  addUser(nom: string, prenom: string, sexe: string, mail: string, password: string, ){
      const newUser = {firstName: '', lastName: '', sex: '', mail:'', password:''};
      newUser.firstName = prenom;
      newUser.lastName = nom;
      newUser.sex = sexe;
      newUser.mail = mail;
      newUser.password = password;
      this.users.push(newUser);
      this.saveUsersToServers();
    }



  saveUsersToServers(){
    this.httpClient
      .put(this.auth.backend+"users.json", this.users) //post() : lancer un appel POST, prend l'url visé et ce qui faut lui envoyer
      .subscribe( //                                            Cette méthode renvoie un Observable, elle ne fait pas appel à elle toute seule
        () => { //                                       c'est en y souscrivant que l'appel est lancé ; put() écrase
          console.log("Enregistrement ok!");
        },                                         //subscribe() prévoie le cas où tout fonctionne t le cas où il y a des erreurs
        (error) => {
          console.log("Erreur : "+ error);
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


