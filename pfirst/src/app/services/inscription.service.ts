import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {Router} from "@angular/router";

@Injectable()

export class InscriptionService{

  users = new Array<{firstName: string, lastName: string, sex: string, mail: string, password: string}>();


  constructor(private httpClient: HttpClient, private auth : AuthService, private router : Router) {}






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


