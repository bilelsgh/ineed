import {Component, Input, OnInit} from '@angular/core';
import { ServiceService } from '../services/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {UserService} from '../services/users.service';
import {Cuisine} from "../models/Cuisine.model";

@Component({
  selector: 'app-cuisine-single',
  templateUrl: './cuisine-single.component.html',
  styleUrls: ['./cuisine-single.component.css']
})
export class CuisineSingleComponent implements OnInit {

  applied: boolean;
  Name: string = 'Courses';
  User: string = 'Utilisateur';
  Description: string = 'Description';
  Sur_place: string = 'oui';
  DispoJour: string = 'oui';
  DispoHeure: string = 'oui';
  Type_de_plat: string = "pas ouf";
  @Input() service_descriptor: Cuisine;

  constructor(private serviceService: ServiceService, private route: ActivatedRoute, private router: Router,
              private httpClient: HttpClient, private auth: AuthService, private userserv: UserService) {
  }

  ngOnInit() {
    this.applied = false;//this.appliedOrNot();
    this.Name = this.service_descriptor.content.name;
    this.User = this.service_descriptor.content.user;
    this.Description = this.service_descriptor.content.description;
    this.Sur_place = this.service_descriptor.content.sur_place;
    this.DispoJour = this.service_descriptor.content.datejour;
    this.DispoHeure = this.service_descriptor.content.dateheure;
    this.Type_de_plat = this.service_descriptor.content.type_de_plat;

  }

  /*ENVOIE L'ID DE CELUI QUI A FAIT L'ANNONCE POUR ALLER CHERCHER UN TOKEN ET DONC INFO DE L'UTILISATEUR
   EN QUESTION.
    */
  goProfil() {
    this.httpClient
      .put(this.auth.backend_test + 'other_user.json', this.service_descriptor.idUser)
      .subscribe(
        (token) => {
          this.auth.setUserInfo(token, 'current_profil');
          this.router.navigate(['profil']);

        },
        (error) => {
          console.log("Erreur de chargement : " + error);
        }
      );
  }

  applyCuisine() {
    if (!this.applied) {
      this.serviceService.applyService(this.service_descriptor.id)
      //mettre à jour this.applied
    }
  }

  //Indique si l'utilisateur s'est proposé pour cette annonce
  /*brief Renvoie vrai sur l'utilisateur a déjà proposé son aide pour cette annonce*/
  appliedOrNot(): boolean {
    this.httpClient
      .get(this.auth.backend + 'api/announce/' + this.service_descriptor.id + '/helpers?token=' +
        JSON.parse(localStorage.getItem('token')) )
      .subscribe(
        (response) => {
          this.auth.setUserInfo(JSON.stringify(response['token']), 'current_profil'); //mise à jour du token

          for(let helper of response['helpers']){
            if(helper['idUser'] === JSON.parse(localStorage.getItem('user'))['idUser']){
              return false;
            }
          }
          return true;
        },
        (error) => {
          console.log("Erreur de récupération des helpers dans cuisine-single : " + error);
        }
      );
  }
}
