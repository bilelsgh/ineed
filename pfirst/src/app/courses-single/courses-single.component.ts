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

  Name: string = 'Courses';
  User: string = 'Utilisateur';
  Description: string = 'Description';
  Liste = new Array<{produit: string, quantite: string}>();
  Accompagne : string = 'oui';
  Budget : number = 55;
  Dispo: string="coucou"
  liste_a_copier : string;
  copied = false;
  @Input() service_descriptor: Courses;


  constructor(private serviceService: ServiceService,  private route: ActivatedRoute, private router: Router,
              private httpClient : HttpClient, private auth : AuthService, private userserv : UserService) { }

  ngOnInit() {
    this.Name = this.service_descriptor.name;
    this.User=this.service_descriptor.user;
    this.Description = this.service_descriptor.description;
    this.Liste= this.service_descriptor.liste;
    this.Accompagne=this.service_descriptor.accompagner;
    this.Budget=this.service_descriptor.budget;
    this.Dispo=this.service_descriptor.date;
    this.writeList();
    this.copied = false;
    /*
    const id = this.route.snapshot.params['id'];
    this.Name = this.serviceService.getServiceById(+id).name;
    this.User=this.serviceService.getServiceById(+id).user;
    this.Description = this.serviceService.getServiceById(+id).description;
    this.Liste= this.serviceService.getServiceById(+id).liste;
    this.Accompagne=this.serviceService.getServiceById(+id).accompagner;
    this.Budget=this.serviceService.getServiceById(+id).budget;
    this.Dispo=this.serviceService.getServiceById(+id).date;
    this.writeList();
    this.copied = false;
     */
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

  goProfil(){
    this.httpClient
      .get<any[]>(this.auth.backend_test+'other_user.json')
      .subscribe(
        (response) => {

          this.userserv.info_user = response;
          console.log("#OK");
          console.log("#SERVICES : " + response);
        },
        (error) => {
          console.log("Erreur de chargement : " + error);
        }
      );
    this.router.navigate(['profil']);
  }


}
