import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {UserService} from "../services/users.service";

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
  public isCollapsed: boolean = true;
  helpers: any[] = [];
  response: number[];


  constructor(private httpClient : HttpClient, private auth : AuthService, private router : Router,
              private userService : UserService) { }

  ngOnInit(): void {
    this.response = new Array (50); // taille arbitraire (il ne devrait pas y avoir + de 50 services en cours)
    this.getHelpers(this.id);
  }

  getHelpers(announceId: number = 0){
    if (announceId === 0) {   //pas d'annonce selectionée
      this.helpers = [];
    }else{
      this.userService.getAnnounceHelpersById(String(announceId) )
      //this.userService.getAnnounceHelpersById(announceId)
      .then(() => {
        this.helpers = this.userService.announceHelpers;
        this.helpers.length === 0 ? this.noHelper = true : this.noHelper = false ;
      })
      .catch((e) => {
        console.log("#getHelpers : erreur de recupération ", e);
        this.helpers = [];
      });
}
}

  getUser(){
    return this.serviceUser;
  }

  getDescription(){
    return this.serviceDescription;
  }

  acceptHelper(helperID : number){
    //faire une requete sur la route de SIDI
  }


}
