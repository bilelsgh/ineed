import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../services/auth.service";

@Component({
  selector: 'app-service-activity',
  templateUrl: './service-activity.component.html',
  styleUrls: ['./service-activity.component.css']
})
export class ServiceActivityComponent implements OnInit {

  @Input() serviceName: string;
  @Input() ServiceType : string;
  @Input() serviceUser: string;
  @Input() serviceDescription : string;
  @Input() serviceImage : string;
  @Input() serviceDate : string;
  @Input() index : number;
  @Input() id : number;
  noHelper : boolean;



  constructor(private httpClient : HttpClient, private auth : AuthService) { }

  ngOnInit(): void {
    this.receiveHelpers();
  }

  receiveHelpers(){
    this.httpClient
      .get<any[]>(this.auth.backend + "api/announce/" + this.id + "/helpers?token=" +
        JSON.parse(localStorage.getItem('token')))
      .subscribe(
        (response) => {
          response['helpers'].length === 0 ? this.noHelper = true : this.noHelper = false;
        },
        (error) => {
          if(error['status'] === 401){
            this.auth.removeUserInfo();
            console.log("#TOKEN EXPIRED");
          }
          console.log("#DEBUG : Erreur lors de la réception des helpers (service-activity) : "+ error);
        }
      );
  }

  getUser(){
    return this.serviceUser;
  }

  getDescription(){
    return this.serviceDescription;
  }



}
