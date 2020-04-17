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

  Name: string = 'Courses';
  User: string = 'Utilisateur';
  Description: string = 'Description';
  Sur_place:string = 'oui';
  Dispo : string = 'oui';
  Type_de_plat : string = "pas ouf";
  @Input() service_descriptor: Cuisine;

  constructor(private serviceService: ServiceService,  private route: ActivatedRoute, private router: Router,
              private httpClient : HttpClient, private auth : AuthService, private userserv : UserService) { }

  ngOnInit() {
    this.Name = this.service_descriptor.name;
    this.User=this.service_descriptor.user;
    this.Description = this.service_descriptor.description;
    this.Sur_place= this.service_descriptor.sur_place;
    this.Dispo=this.service_descriptor.date;
    this.Type_de_plat=this.service_descriptor.type_de_plat;
    /*
    const id = this.route.snapshot.params['id'];
    this.Name = this.serviceService.getServiceById(+id).name;
    this.User=this.serviceService.getServiceById(+id).user;
    this.Description = this.serviceService.getServiceById(+id).description;
    this.Sur_place= this.serviceService.getServiceById(+id).sur_place;
    this.Dispo=this.serviceService.getServiceById(+id).date;
    this.Type_de_plat=this.serviceService.getServiceById(+id).type_de_plat;
     */
  }

  /*ENVOIE L'ID DE CELUI QUI A FAIT L'ANNONCE POUR ALLER CHERCHER UN TOKEN ET DONC INFO DE L'UTILISATEUR
   EN QUESTION.
    */
  goProfil(){
    this.httpClient
      .put(this.auth.backend_test+'other_user.json', this.service_descriptor.id_user)
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
}
