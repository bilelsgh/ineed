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
   servicesContent = new Array;
  services_db : any[];
  content: any [];
  kms : number;
  public showncourses = false;
  public shownmenage = false;
  public showncuisine = false;
  public shownaccompagne = false;
  public all = true;

  constructor (private serviceService : ServiceService, private auth: AuthService, private httpClient : HttpClient){
  }


  ngOnInit(){

    //RÉCUPÈRE DEPUIS LE BACK
    this.httpClient
      .get<any[]>(this.auth.backend+'api/announce')
      .subscribe(
        (response) => {
          console.log("#######ALL ANNOUNCES###########");
          console.log(response);
          /*for (let j=0; j< response.length ; j++) {
            console.log("##########ANNOUNCE " + (j+1) + "###########" );

            this.servicesContent.push(
              {idUser: response[j]['idUser'], content: JSON.parse(response[j]['content']),
                id: response[j]['id'], price: response[j]['price']}
            );
          }*/

        },
        (error) => {
          if(error['status'] === 401){
            this.auth.removeUserInfo();
          }
          console.log("Erreur lors de la récupération des services : " + error);
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
