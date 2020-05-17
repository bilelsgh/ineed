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

  Name: string ;
  User: string = 'Utilisateur';
  Description: string = 'Description';
  Local:string = 'oui';
  Dispo : string = 'oui';
  Quand1 : string;
  Quand2 : string;
  Kind: string = "non";
  View : string;
  @Input() service_descriptor: Accompage;

  constructor(private serviceService: ServiceService,  private route: ActivatedRoute, private router: Router,
              private httpClient : HttpClient, private auth : AuthService, private userserv : UserService) { }

  ngOnInit() {
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
}
