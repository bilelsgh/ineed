import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/users.service';
import {ComponentPortal} from "@angular/cdk/portal";
import {Overlay} from "@angular/cdk/overlay";
import {catchError} from "rxjs/operators";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  public rank : string;
  myProfil : boolean;
  info_user : any;
  id: string;
  number_services_proposed : number;
  number_services_asked : number = 0;

  constructor(private userService : UserService,
              private route: ActivatedRoute, public router: Router) {
  }

  ngOnInit(): void {
    this.getServiceProposedAndFinished();
    this.getRank();
    this.id = this.route.snapshot.params['id'];
    if(this.id === 'current_user' || this.id === String(JSON.parse(localStorage.getItem('user'))["idUser"])){
      this.info_user = JSON.parse(localStorage.getItem('user')) ;
      this.myProfil = true;
      //si on accède au profil ailleurs que depuis la modal, on va chercher dans le back les infos
    }else{
      this.userService.getProfilById(this.id)
        .then(()=>{
          this.info_user = JSON.parse(localStorage.getItem('current_profil')) ;
          this.myProfil = false;
        })
        .catch(()=>{console.log("erreur de chargement profil");});
    }

  }

  getServiceProposedAndFinished(){
    this.userService.getServiceProposedAndFinished()
      .then( () => {
        this.number_services_proposed = this.userService.services_proposed_finished.length;
        this.getRank();
      })
      .catch( (e) => {
        console.log("Erreur récupération des services proposés #profil-component");
        this.number_services_proposed = -1;
        this.getRank();
      })
  }

  getServiceAskedAnfFinished(){};

  getRank(){
    let number_services = this.number_services_proposed + this.number_services_asked;
    if( number_services < 0){
      this.rank = "undefined"
    }else if(number_services >= 0 && number_services <= 5){
      this.rank = "Débutant";
    }else if(number_services > 5 && number_services <= 10){
      this.rank = "Confirmé";
    }else if(number_services > 10){
      this.rank = "Expert";
    }
  }
}
