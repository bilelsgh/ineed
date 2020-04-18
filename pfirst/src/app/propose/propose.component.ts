import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';
import {AuthService} from '../services/auth.service';
import {newArray} from '@angular/compiler/src/util';
import {HttpClient} from '@angular/common/http';
import {Courses} from '../models/Courses.model';

@Component({
  selector: 'app-service-view',
  templateUrl: './propose.component.html',
  styleUrls: ['./propose.component.css']
})
export class ServiceViewComponent implements OnInit {
  type: any[];
  types : any[];
  service: any[];
  services_db : any[];
  kms : number;
  public showncourses = false;
  public shownmenage = false;
  public showncuisine = false;
  public shownaccompagne = false;
  public all = true;

  constructor (private serviceService : ServiceService, private auth: AuthService, private httpClient : HttpClient){
  }
  

  ngOnInit(){
    

    this.httpClient
      .get<any[]>(this.auth.backend_test+'services.json')
      .subscribe(
        (response) => {

          this.services_db = response;
          console.log("#OK");
          console.log("#SERVICES : " + response);
        },
        (error) => {
          console.log("Erreur de chargement : " + error);
        }
      );

  }
  lireService(){
    console.log("##SERVICE DB##\n");
    for(let service of this.services_db){
      console.log("NAME : " + service["name"] + " // ");
      console.log("USER : " + service["user"] + "# \n");
    }


  }

}
