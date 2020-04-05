import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';
import {AuthService} from '../services/auth.service';
import {newArray} from '@angular/compiler/src/util';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-service-view',
  templateUrl: './propose.component.html',
  styleUrls: ['./propose.component.css']
})
export class ServiceViewComponent implements OnInit {
  type: any[];
  types : any[];
  services: any[];
  services_db = new Array<{any:any}>();

  constructor (private serviceService : ServiceService, private auth: AuthService, private httpClient : HttpClient){


  }
  ngOnInit(){
    this.services=this.serviceService.services

    this.httpClient
      .get<any[]>(this.auth.db+"services.json")
      .subscribe(
        (response) => {
          this.services_db = response;
          console.log("#OK");
          console.log("SERVICES : " + response);
        },
        (error) => {
          console.log("Erreur de chargement : " + error);
        }
      );




  }

}
