import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from "../services/auth.service";
import {UserService} from "../services/users.service";

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

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

  selectedId: string;

  helpers: any[];

  constructor(private httpClient: HttpClient,
              private authService: AuthService,
              private userService: UserService
  ) {
  }

  ngOnInit(): void {
    /*
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
    this.userService.getPostedAnnounces(JSON.parse(localStorage.getItem('user'))['idUser'])
      .then(() => {
        this.proposed_services = this.userService.active_announces;
        this.proposed_services.forEach((serv) => {
          serv.content = JSON.parse(serv.content);
        });
        console.log('#ACTIVIY : Récupération ok', 'announces in userServ :', this.userService.active_announces);
        this.selectedId = this.proposed_services.length > 0 ? this.proposed_services[0]['idAnnounce'] : '0';
        console.log("SELECTED ID : ", this.selectedId);
        if (this.selectedId != '0') {  // vérifier avec le back que un id ne peut pas etre égal à 0
          this.helpers = this.getHelpers(this.selectedId);
        }
      })
      .catch((e) => {
        console.log('#ACTIVITY: Erreur de récupération des services demandés', e);
      });
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


  getHelpers(announceId: string) {
    this.userService.getAnnounceHelpersById(announceId)
      .then(() => {
        console.log("#Got helpers for announce of id = ", this.selectedId);
        console.log("Helpers = ", this.userService.announceHelpers);
        return this.userService.announceHelpers;
      })
      .catch((e) => {
        console.log("#getHelpers : erreur de recupération ", e);
        const emptyTab = [];
        return emptyTab;
      });
  }


}
