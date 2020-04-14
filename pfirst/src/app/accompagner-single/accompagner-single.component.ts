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

  Name: string = 'Courses';
  User: string = 'Utilisateur';
  Description: string = 'Description';
  Local:string = 'oui';
  Dispo : string = 'oui';
  Quand : string = "caca";
  Kind: string = "non"
  @Input() service_descriptor: Accompage;

  constructor(private serviceService: ServiceService,  private route: ActivatedRoute, private router: Router,
              private httpClient : HttpClient, private auth : AuthService, private userserv : UserService) { }

  ngOnInit() {
    this.Name = this.service_descriptor.name;
    this.User=this.service_descriptor.user;
    this.Description = this.service_descriptor.description;
    this.Local= this.service_descriptor.local;
    this.Dispo=this.service_descriptor.date;
    this.Quand=this.service_descriptor.quand;
    this.Kind=this.service_descriptor.kind;
    

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
