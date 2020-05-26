import {Component, Input, OnInit} from '@angular/core';
import { ServiceService } from '../services/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {UserService} from '../services/users.service';
import {Menage} from "../models/Menage.model";

@Component({
  selector: 'app-menage-single',
  templateUrl: './menage-single.component.html',
  styleUrls: ['./menage-single.component.css']
})
export class MenageSingleComponent implements OnInit {


  myService : boolean;
  applied : boolean;
  View : number;
  Name: string = 'Courses';
  User: string = 'Utilisateur';
  Description: string = 'Description';
  Materiel: any = [];
  Date : any;
  Heure: string ="";
  Salle: string ="";
  Localisation: string;
  Surface : number;
  liste_a_copier : string;
  copied = false;
  @Input() service_descriptor: Menage;


  constructor(private serviceService: ServiceService,  private route: ActivatedRoute, public router: Router,
              private httpClient : HttpClient, private auth : AuthService, private userserv : UserService) { }

  ngOnInit() {
    this.appliedOrNot();
    this.Name = this.service_descriptor.content.name;
    this.User=this.service_descriptor.content.user;
    this.Description = this.service_descriptor.content.description;
    this.Materiel= this.service_descriptor.content.materiel;
    this.Date=new Date(this.service_descriptor.content.datejour);
    this.Heure = this.service_descriptor.content.dateheure;
    this.Surface=parseInt(this.service_descriptor.content.surface);
    this.View= this.service_descriptor['viewNumber'];

    this.Salle=this.service_descriptor.content.salle;
    this.Localisation=this.service_descriptor.content.localisation;
    this.writeList();
    this.copied = false;
    /*
    const id = this.route.snapshot.params['id'];
    this.Name = this.serviceService.getServiceById(+id).name;
    this.User=this.serviceService.getServiceById(+id).user;
    this.Description = this.serviceService.getServiceById(+id).description;
    this.Materiel= this.serviceService.getServiceById(+id).materiel;
    this.Date=this.serviceService.getServiceById(+id).date;
    this.Surface=this.serviceService.getServiceById(+id).surface;
    this.Heure=this.serviceService.getServiceById(+id).heure;
    this.Salle=this.serviceService.getServiceById(+id).salle;
    this.Localisation=this.serviceService.getServiceById(+id).localisation;
    this.writeList();
    this.copied = false;
     */
  }

  writeList(){
    let current : string;
    for(let elt of this.Materiel){
      current = '\n' + elt;
      this.liste_a_copier += current;

    }
  }
  copyToClipboard(val : string){
    this.copied = true;
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  /*ENVOIE L'ID DE CELUI QUI A FAIT L'ANNONCE POUR ALLER CHERCHER UN TOKEN ET DONC INFO DE L'UTILISATEUR
   EN QUESTION.
    */
  goProfil(where : string){
    this.router.navigate([where]);
  }

  applyMenage() {
    if (!this.applied) {
      this.serviceService.applyService(this.service_descriptor.id, this.service_descriptor.idUser);
      this.appliedOrNot();
    }
  }

  //Indique si l'utilisateur s'est proposé pour cette annonce
  /*brief Renvoie vrai si l'utilisateur a déjà proposé son aide pour cette annonce*/
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
