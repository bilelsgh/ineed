import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()

export class InscriptionService{

  users = new Array<{prenom: string, nom: string, sexe: string, mail: string, password: string}>();

  constructor(private httpClient: HttpClient) {}


  addUser(nom: string, prenom: string, sexe: string, mail: string, password: string){
      const newUser = {prenom: '', nom: '', sexe: '', mail:'', password:''};
      newUser.prenom = prenom;
      newUser.nom = nom;
      newUser.sexe = sexe;
      newUser.mail = mail;
      newUser.password = password;
      this.users.push(newUser);
      this.saveUsersToServers();
    }



  saveUsersToServers(){
    this.httpClient
      .put('https://ineed-1ce51.firebaseio.com/users.json', this.users) //post() : lancer un appel POST, prend l'url visé et ce qui faut lui envoyer
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
      .get<any[]>('https://ineed-1ce51.firebaseio.com/')
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


