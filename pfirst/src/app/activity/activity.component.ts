import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from "../services/auth.service";
import {UserService} from "../services/users.service";
import {MatSelectModule} from "@angular/material/select";
import {MatToolbar} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";
import {Router} from "@angular/router";

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  public isCollapsedDemande: boolean = true;
  public isCollapsedProposition : boolean = true;

  proposed_services: any[];
  asked_services: any[] = [
    {
      content: {
        budget: '98',
        datejour: '30/03/2002',
        description: 'J\'ai faim la vie de maman',
        image: '../assets/data/cuisine_pour_annonce_courte.jpg',
        name: 'Faire les courses',
        type: 'service1',
        user: 'Jean Paul Gauthier',
      }
    },
    {
      content: {
        budget: '98',
        datejour: '30/03/2002',
        description: 'J\'ai faim la vie de maman',
        image: '../assets/data/accompagne_pour_annonce_courte.jpg',
        name: 'Faire les courses',
        type: 'service1',
        user: 'Jean Paul Gauthier',
      }
    },
  ];

  indexes: any[] = [
    {
      value: 1,
      view: '1'
    },
    {
      value: 2,
      view: '2'
    }
  ];


  selectedAnnounce: number; // index de l'annonce dans asked_services

  helpers: any[] = [];

  response: number[];

  constructor(private httpClient: HttpClient,
              private authService: AuthService,
              private userService: UserService,
              public router: Router,
              private auth : AuthService
  ) {
  }

  ngOnInit(): void {

    this.getProposition(); //récupération des services pour lesquels j'ai postulés

    this.response = new Array (50); // taille arbitraire (il ne devrait pas y avoir + de 50 services en cours)

    // Si tu fait avec les activite/id pour les propositions, il faut que tu mette la méthode getHelpers
    // (en bas, modifs à faire en commentaires) avec l'id de l'url
    console.log('ID : ', JSON.parse(localStorage.getItem('user'))['idUser']);
    this.userService.getPostedAnnounces(JSON.parse(localStorage.getItem('user'))['idUser'])
      .then(() => {
        this.asked_services = this.userService.active_announces;
        this.asked_services.forEach((serv) => {
          serv.content = JSON.parse(serv.content);
        });
        console.log('#ACTIVIY : Récupération ok', 'announces in userServ :', this.userService.active_announces);
        this.selectedAnnounce = this.asked_services.length > 0 ? 0 : -1;
        console.log("SELECTED INDEX : ", this.selectedAnnounce);
        //a modifier aussi si modif getHelpers
        if (this.selectedAnnounce != -1) {
          this.getHelpers(this.selectedAnnounce);
          //getHelpers(this.asked_services[this.selectedAnnounce]['idAnnounce']);
        }

      })
      .catch(
        (e) => {
          console.log('#ACTIVITY: Erreur de récupération des services demandés', e);
        });
  }

  getHelpers(announceIndex: number = this.selectedAnnounce) {
    this.userService.getAnnounceHelpersById(this.asked_services[announceIndex]['idAnnounce'])
      //this.userService.getAnnounceHelpersById(announceId)
      .then(() => {
        console.log("#Got helpers for announce of index = ", this.selectedAnnounce);
        console.log("Helpers = ", this.userService.announceHelpers);
        this.helpers = this.userService.announceHelpers;
      })
      .catch((e) => {
        console.log("#getHelpers : erreur de recupération ", e);
        this.helpers = [];
      });
  }

  getProposition(){
    this.httpClient
      .get<any[]>(this.auth.backend + 'api/announce/' + JSON.parse(localStorage.getItem('user'))['idUser'] + '/done?token=' +
        JSON.parse(localStorage.getItem('token')) )
      .subscribe(
        (response) => {
          console.log("PROPOSITION");
          console.table(response);
         /* this.proposed_services = response['undones'] /
          this.proposed_services.forEach((serv) => {
          serv.content = JSON.parse(serv.content);
        });*/
        },
        (error) => {
          if (error['status'] === 401) {
            this.auth.removeUserInfo();
            console.log("#TOKEN EXPIRED");
          }
          console.log("#getProposition() :Erreur de chargement : ", error);
        }
      );
  }

}
