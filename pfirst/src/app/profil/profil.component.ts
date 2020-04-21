import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/users.service';
import {ComponentPortal} from "@angular/cdk/portal";
import {Overlay} from "@angular/cdk/overlay";
import {catchError} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  info_user : any;
  id: string;

  constructor(private userService : UserService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    if(this.id === 'current_user' || this.id === String(JSON.parse(localStorage.getItem('token'))["user"]["idUser"])){
      this.info_user = JSON.parse(localStorage.getItem('token'))["user"] ;

      //si on accède au profil ailleurs que depuis la modal, on va chercher dans le back les infos
    }else{
      this.userService.getProfilById(this.id)
        .then(()=>{
          this.info_user = JSON.parse(localStorage.getItem('current_profil'))["user"] ;
        })
        .catch(()=>{console.log("erreur de chargement profil");});
    }


  }

  onSave(){
    this.userService.saveUserInfosToServer();
  }

  onLoad(){
    this.userService.getUserInfosFromServer();
  }

}
