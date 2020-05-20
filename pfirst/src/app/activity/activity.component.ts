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
  public isCollapsedEnCours : boolean = true;
  selectedAnnounce: number; // index de l'annonce dans asked_services
  helpers: any[] = [];
  response: number[];
  en_cours_asked: any[] = [];
  en_cours_proposed: any[] = [];
  proposed_services: any[] = [];
  public asked_services: any[] = [];

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




  constructor(private httpClient: HttpClient,
              private authService: AuthService,
              private userService: UserService,
              public router: Router,
              private auth : AuthService
  ) {
  }

  ngOnInit(): void {
    this.getProposedAnnounce();

    this.response = new Array (50); // taille arbitraire (il ne devrait pas y avoir + de 50 services en cours)

    console.log('ID : ', JSON.parse(localStorage.getItem('user'))['idUser']);
    this.userService.getPostedAnnounces(JSON.parse(localStorage.getItem('user'))['idUser'])
      .then(() => {
        let response = this.userService.active_announces;
        for (let service of response ) {
          if (service.status === 1) {
            service.content = JSON.parse(service.content);
            this.en_cours_asked.push(service);
          } else {
            service.content = JSON.parse(service.content);
            this.asked_services.push(service);
          }
        }
          this.selectedAnnounce = this.asked_services.length > 0 ? 0 : -1;

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
        //console.log("#Got helpers for announce of index = ", this.selectedAnnounce);
        //console.log("Helpers = ", this.userService.announceHelpers);
        this.helpers = this.userService.announceHelpers;
      })
      .catch((e) => {
        console.log("#getHelpers : erreur de recupération ", e);
        this.helpers = [];
      });
  }

  getProposedAnnounce(){
    console.log("DANS GET PROPOSED");
    this.httpClient
      .get<any[]>(this.auth.backend + 'api/announce/undone?token=' + JSON.parse(localStorage.getItem('token')))
      .subscribe(
        (response) => {
          for (let service of response["undoneS"] ) {
            if (service.status === 1) {
              service.content = JSON.parse(service.content);
              this.en_cours_proposed.push(service);
            } else {
              service.content = JSON.parse(service.content);
              this.proposed_services.push(service);
            }
          }
        },
        (error) => {
          if (error['status'] === 401) {
            this.auth.removeUserInfo();
            console.log('#TOKEN EXPIRED');
          }
          console.log('#DEBUG : Erreur lors de la récupération de mes propositions [service-proposed] ' + error);
        }
      );
  }

}
