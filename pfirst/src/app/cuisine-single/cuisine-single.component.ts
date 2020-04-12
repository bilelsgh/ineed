import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {UserService} from '../services/users.service';

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

  constructor(private serviceService: ServiceService,  private route: ActivatedRoute, private router: Router,
              private httpClient : HttpClient, private auth : AuthService, private userserv : UserService) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.Name = this.serviceService.getServiceById(+id).name;
    this.User=this.serviceService.getServiceById(+id).user;
    this.Description = this.serviceService.getServiceById(+id).description;
    this.Sur_place= this.serviceService.getServiceById(+id).sur_place;
    this.Dispo=this.serviceService.getServiceById(+id).date;
    this.Type_de_plat=this.serviceService.getServiceById(+id).type_de_plat;
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
