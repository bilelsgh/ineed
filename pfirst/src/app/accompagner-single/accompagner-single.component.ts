import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {UserService} from '../services/users.service';

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

  constructor(private serviceService: ServiceService,  private route: ActivatedRoute, private router: Router,
              private httpClient : HttpClient, private auth : AuthService, private userserv : UserService) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.Name = this.serviceService.getServiceById(+id).name;
    this.User=this.serviceService.getServiceById(+id).user;
    this.Description = this.serviceService.getServiceById(+id).description;
    this.Local= this.serviceService.getServiceById(+id).local;
    this.Dispo=this.serviceService.getServiceById(+id).date;
    this.Quand=this.serviceService.getServiceById(+id).quand;
    this.Kind=this.serviceService.getServiceById(+id).kind;

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
