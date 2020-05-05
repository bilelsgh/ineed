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

  View : number;
  Name: string = 'Courses';
  User: string = 'Utilisateur';
  Description: string = 'Description';
  Sur_place:string = 'oui';
  DispoJour : string = 'oui';
  DispoHeure : string = 'oui';
  Type_de_plat : string = "pas ouf";
  Id : number;

  @Input() service_descriptor: Cuisine;

  constructor(private serviceService: ServiceService,  private route: ActivatedRoute, private router: Router,
              private httpClient : HttpClient, private auth : AuthService, private userserv : UserService) { }

  ngOnInit() {
    this.Id = this.service_descriptor.idUser;
    this.Name = this.service_descriptor.content.name;
    this.User=this.service_descriptor.content.user;
    this.Description = this.service_descriptor.content.description;
    this.Sur_place= this.service_descriptor.content.sur_place;
    this.DispoJour=this.service_descriptor.content.datejour;
    this.DispoHeure=this.service_descriptor.content.dateheure;
    this.Type_de_plat=this.service_descriptor.content.type_de_plat;
    this.View = this.service_descriptor.content.viewNumber;


    //GESTION DU NOMBRE DE VUS
    if(JSON.parse(localStorage.getItem('user'))["idUser"] != this.Id){
      let new_view = this.View + 1;
      this.View = new_view;

      //CRéation du service avec le nombre de vu mis à jour
      const content=  {id: 5, type:'service3', name:"Faire la cuisine", user: this.User ,description: this.Description,
        lieu:this.service_descriptor.content.lieu , sur_place:this.Sur_place,
        datejour:this.DispoJour, dateheure : this.DispoHeure, type_de_plat: this.Type_de_plat, viewNumber : new_view, image: '../../assets/data/cuisine.png' }
      const newCuisine= new Cuisine( JSON.parse(localStorage.getItem('user'))["idUser"], content,
        this.service_descriptor.id, this.service_descriptor.price, this.service_descriptor.finished);

      //envoie du nouveau viewNUmber dans le back
      this.updateView(newCuisine);
    }

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
      .put(this.auth.backend_test+'other_user.json', this.service_descriptor.idUser)
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

  //IL FAUT PAS ENVOYER JUSTE CUISINE MAIS TOUT LE TABLEAU DE SERVICES
  updateView(cuisine : Cuisine){
    this.httpClient
      .put(this.auth.backend_test+'services.json', cuisine)
      .subscribe(
        (response) => {

        },
        (error) => {
          console.log("Erreur d'envoie de l'annonce avec les nouvelles vues : " + error);
        }
      );
  }
}
