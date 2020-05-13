import {Component, Input, OnInit} from '@angular/core';
import { ServiceService } from '../services/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {UserService} from '../services/users.service';
import {Courses} from "../models/Courses.model";

@Component({
  selector: 'app-courses-single',
  templateUrl: './courses-single.component.html',
  styleUrls: ['./courses-single.component.css']
})
export class CoursesSingleComponent implements OnInit {

  applied: boolean;
  Name: string = 'Courses';
  User: string = 'Utilisateur';
  Description: string = 'Description';
  Liste = new Array<{produit: string, quantite: string}>();
  Accompagne : string = 'oui';
  Budget : number;
  DispoJour: any;
  DispoHeure: any;
  liste_a_copier : string = "LISTE : \n ";
  copied = false;
  View: number;
  @Input() service_descriptor: Courses;


  constructor(private serviceService: ServiceService,  private route: ActivatedRoute, private router: Router,
              private httpClient : HttpClient, private auth : AuthService, private userserv : UserService) { }

  ngOnInit() {

    this.appliedOrNot();
    this.Name = this.service_descriptor.content.name;
    this.User=this.service_descriptor.content.user;
    this.Description = this.service_descriptor.content.description;
    this.Liste= this.service_descriptor.content.liste;
    this.Accompagne=this.service_descriptor.content.accompagner;
    this.Budget=parseInt(this.service_descriptor.content.budget);
    const dispo=this.service_descriptor.content.datejour;
    this.DispoJour=new Date(dispo);
    this.DispoHeure= this.service_descriptor.content.dateheure
    this.writeList();
    this.copied = false;
    this.View = this.service_descriptor['viewNumber'];


    console.log("BUDGET : " + this.Budget);
  }

  writeList(){
    let current : string;
    for(let elt of this.Liste){
      current = '\n' + elt.produit + " -> " + elt.quantite;
      this.liste_a_copier += current;

    }
  }

  //###########COPIER LA LISTE##################""

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

  goProfil(where : string){
    this.router.navigate([where]);
  }

  applyCourses() {
    if (!this.applied) {
      this.serviceService.applyService(this.service_descriptor.id)
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
        },
        (error) => {
          console.log("Erreur de récupération des helpers dans cuisine-single : " + error);
        }
      );
  }


}
