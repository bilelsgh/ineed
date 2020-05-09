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
  Budget : number;
  DispoJour: any;
  DispoHeure: any;
  liste_a_copier : string = "LISTE : \n ";
  copied = false;
  View: string;
  @Input() service_descriptor: Courses;


  constructor(private serviceService: ServiceService,  private route: ActivatedRoute, private router: Router,
              private httpClient : HttpClient, private auth : AuthService, private userserv : UserService) { }

  ngOnInit() {
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


}
