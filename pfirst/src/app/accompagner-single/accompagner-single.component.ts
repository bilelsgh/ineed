import {Component, Input, OnInit} from '@angular/core';
import { ServiceService } from '../services/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {UserService} from '../services/users.service';
import {Accompage} from "../models/Accompage.model";

@Component({
  selector: 'app-accompagner-single',
  templateUrl: './accompagner-single.component.html',
  styleUrls: ['./accompagner-single.component.css']
})

export class AccompagnerSingleComponent implements OnInit {

  myService : boolean;
  applied : boolean;
  Name: string ;
  User: string = 'Utilisateur';
  Description: string = 'Description';
  Local:string = 'oui';
  Dispo : string = 'oui';
  Quand1 : string;
  Quand2 : string;
  Kind: string = "non";
  View : number;
  @Input() service_descriptor: Accompage;

  constructor(private serviceService: ServiceService,  private route: ActivatedRoute, public router: Router,
              private httpClient : HttpClient, private auth : AuthService, private userserv : UserService) { }

  ngOnInit() {
    this.appliedOrNot();

    this.Name = this.service_descriptor.content.name;
    this.User=this.service_descriptor.content.user;
    this.Description = this.service_descriptor.content.description;
    this.Local= this.service_descriptor.content.local;
    this.Dispo=this.service_descriptor.content.datejour;
    this.Quand1=this.service_descriptor.content.quand1;
    this.Quand2=this.service_descriptor.content.quand2;
    this.View = this.service_descriptor['viewNumber'];
    this.Kind=this.service_descriptor.content.kind;


  }

  /*ENVOIE L'ID DE CELUI QUI A FAIT L'ANNONCE POUR ALLER CHERCHER UN TOKEN ET DONC INFO DE L'UTILISATEUR
  EN QUESTION.
   */
  goProfil(where : string){
    this.router.navigate([where]);
  }

  applyAccompagne() {
    if (!this.applied) {
      this.serviceService.applyService(this.service_descriptor.id)
      this.appliedOrNot();
    }
  }

  //Indique si l'utilisateur s'est proposé pour cette annonce
  /*brief Renvoie vrai so l'utilisateur a déjà proposé son aide pour cette annonce*/
  appliedOrNot() {
    this.httpClient
      .get<any[]>(this.auth.backend + 'api/announce/' + this.service_descriptor.id + '/helpers?token=' +
        JSON.parse(localStorage.getItem('token')))
      .subscribe(
        (response) => {
          this.auth.setUserInfo(JSON.stringify(response['token']), 'current_profil'); //mise à jour du token
          this.applied = false;
          for (let helper of response['helpers']) {
            if (helper['idUser'] === JSON.parse(localStorage.getItem('user'))['idUser']) {
              this.applied = true;
            }
          }
          this.service_descriptor.idUser === JSON.parse(localStorage.getItem('user'))['idUser'] ?
            this.myService = true : this.myService = false;
        },
        (error) => {
          console.log("Erreur de récupération des helpers dans cuisine-single : " + error);
        }
      );
  }

}
