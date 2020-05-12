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

  public isCollapsed: boolean = true;

  proposed_services: any[] = [
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


  selectedAnnounce: number; // index de l'annonce dans proposed_services

  helpers: any[] = [];

  response: number[];

  constructor(private httpClient: HttpClient,
              private authService: AuthService,
              private userService: UserService,
              public router: Router
  ) {
  }

  ngOnInit(): void {
    this.response = new Array (50); // taille arbitraire (il ne devrait pas y avoir + de 50 services en cours)

    // Si tu fait avec les activite/id pour les propositions, il faut que tu mette la méthode getHelpers
    // (en bas, modifs à faire en commentaires) avec l'id de l'url
    console.log('ID : ', JSON.parse(localStorage.getItem('user'))['idUser']);
    this.userService.getPostedAnnounces(JSON.parse(localStorage.getItem('user'))['idUser'])
      .then(() => {
        this.proposed_services = this.userService.active_announces;
        this.proposed_services.forEach((serv) => {
          serv.content = JSON.parse(serv.content);
        });
        console.log('#ACTIVIY : Récupération ok', 'announces in userServ :', this.userService.active_announces);
        this.selectedAnnounce = this.proposed_services.length > 0 ? 0 : -1;
        console.log("SELECTED INDEX : ", this.selectedAnnounce);
        if (this.selectedAnnounce != -1) {
          this.getHelpers(this.selectedAnnounce);
        }

      })
      .catch(
        (e) => {
          console.log('#ACTIVITY: Erreur de récupération des services demandés', e);
        });


    /*   FIREBASE
 this.sendToFirebase().then(() => {
   this.userService.getPostedAnnounces('user')
     .then(() => {
       this.proposed_services = this.userService.active_announces;
     })
     .catch((err) => {
       console.log('#ACTIVITY: Erreur de récupération des services demandés', err);
     });
 })
   .catch(() => {
     console.log('Failed to send actives to firebase');
   });
  */
  }

  sendToFirebase() {
    return new Promise((resolve, reject) => {
      this.httpClient
        .put(this.authService.backend_test + "actives.json", this.proposed_services)
        .subscribe(
          () => {
            console.log("Enregistrement ok!");
            resolve(true);
          },
          (error) => {
            console.log("Erreur : " + error);
            reject(true);
          }
        );
    });
  }

  /* permet de récupérer la liste des helpers pour l'annonce indexée par announceIndex dans this.proposed_services
  (d'ailleurs ca devrait s'appeler asked_services), pour adapter, tu peux garder ta structure qui redirige vers activite/id
  et modifier cette fonction en mettant announceId en parametre (je te met les modifs a faire en commentées si tu veux faire ca)
   */

  getHelpers(announceIndex: number = this.selectedAnnounce) {
    /*
  getHelpers(announceId: string = '0'){
    if this.announceId == '0') {   //pas d'annonce selectionée
       this.helpers = [];
    }else{ // accolade a fermer
    */
    this.userService.getAnnounceHelpersById(this.proposed_services[announceIndex]['idAnnounce'])
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

}
