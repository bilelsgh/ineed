import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {UserService} from '../services/users.service';
import {SuiviService} from '../services/suivi.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-service-activity',
  templateUrl: './service-activity.component.html',
  styleUrls: ['./service-activity.component.css']
})
export class ServiceActivityComponent implements OnInit {

  @Input() serviceName: string;
  @Input() ServiceType: string;
  @Input() serviceUser: string;
  @Input() serviceDescription: string;
  @Input() serviceImage: string;
  @Input() serviceDate: string;
  @Input() index: number;
  @Input() id: number;
  @Input() status: number;
  @Input() service_descriptor: any;
  public noHelper: boolean;
  public isCollapsed: boolean = true;
  public isCollapsed_bis : boolean = true;
  public helpers: any[] = [];
  public response: number[];
  public assignees: number[] = [];
  assigneesSubscription: Subscription;
  public noAssignees: boolean;
  public finished : boolean;

  constructor(private httpClient: HttpClient, private auth: AuthService, public router: Router,
              private userService: UserService, private suiviServ: SuiviService) {
  }

  ngOnInit(): void {
    this.getHelpers(this.id);
    this.getAssignees(this.id);
  }

  getHelpers(announceId: number = 0) {
    this.suiviServ.getHelpers(this.id)
      .then( () => {
        //console.log("Récupération des helpers dans service-activity OK - " + announceId);
        this.helpers = this.suiviServ.helpers;
        //console.table(this.helpers);
        this.noHelper = this.suiviServ.noHelper;
      })
      .catch((e) => {
        console.log('#getHelpers - service-activity: erreur de recupération ', e);
        this.helpers = [];
      });
  }


  acceptHelper(helperID: number) {
    let message = {
      helperID: helperID, helpedID: JSON.parse(localStorage.getItem('user'))['idUser'], token: JSON.parse(localStorage.getItem('token')),
      announceID: this.id
    };

    this.httpClient
      .post(this.auth.backend + 'api/announce/' + this.id + "/helper?token=" + JSON.parse(localStorage.getItem('token')), message)
      .subscribe(
        (response) => {
          this.auth.setUserInfo(JSON.stringify(response['token']), 'token'); //mise à jour du token
          this.getAssignees(this.id);
          console.log("Acceptation ok!");
        },
        (error) => {
          if (error['status'] === 401) {
            this.auth.removeUserInfo();
            console.log('#TOKEN EXPIRED');
          }
          console.log('#DEBUG : Erreur lors de l\'acceptation du helper [service-activity] ' + error);
        }
      );
  }

  amIaHelper(): boolean {
    for (let helper of this.helpers) {
      if (helper['idUser'] === JSON.parse(localStorage.getItem('user'))['idUser']) {
        return true;
      }
    }
    return false;
  }

  getAssignees(id : number = 0) {
    this.response = new Array(50); // taille arbitraire (il ne devrait pas y avoir + de 50 services en cours)
    this.suiviServ.getAssignees(this.id)
      .then( () => {
        this.assignees = this.suiviServ.assignees;
        this.noAssignees = this.assignees.length === 0;
        this.status = this.suiviServ.status;
      })
      .catch((e) => {
        console.log('#getAssignees - service-activity: erreur de recupération ', e);
        this.assignees = [];
      });
  }

  amIanAssignee(id: number): boolean {
    for (let assignee of this.assignees) {
      if (assignee['idUser'] === id ) {
        return true;
      }
    }
    return false;
  }

  startService(){
    //L'annonce est en cours, le statut passe à 1
    let message = {token: JSON.parse(localStorage.getItem('token')),
      announce: {idUser: this.service_descriptor.idUser , content: JSON.stringify(this.service_descriptor.content), id: this.service_descriptor.id,
        price: this.service_descriptor.price, viewNumber: this.service_descriptor.viewNumber, status: 1} };

    this.httpClient
      .put(this.auth.backend + 'api/announce/' + this.id, message )
      .subscribe(
        (response) => {
          this.auth.setUserInfo(JSON.stringify(response['token']), 'token'); //mise à jour du token

          //mise à jour du statut de cette annonce
          this.status = response["announce"].status;
        },
        (error) => {
          if (error['status'] === 401) {
            this.auth.removeUserInfo();
            console.log('#TOKEN EXPIRED');
          }
        }
      );
  }

  endService(){
    //L'annonce est terminée, le statut passe à 2
    let message = {token: JSON.parse(localStorage.getItem('token')),
      announce: {idUser: this.service_descriptor.idUser , content: JSON.stringify(this.service_descriptor.content), id: this.service_descriptor.id,
        price: this.service_descriptor.price, viewNumber: this.service_descriptor.viewNumber, status: 2} };

    this.httpClient
      .put(this.auth.backend + 'api/announce/' + this.id, message )
      .subscribe(
        (response) => {
          this.auth.setUserInfo(JSON.stringify(response['token']), 'token'); //mise à jour du token

          //mise à jour du statut de cette annonce
          this.status = 2;
        },
        (error) => {
          if (error['status'] === 401) {
            this.auth.removeUserInfo();
            console.log('#TOKEN EXPIRED');
          }
        }
      );
  }

  getNameByID(id : number): string{
    let res : string;
    this.httpClient
      .get<any[]>(this.auth.backend + 'api/user/' + id +
        '?token=' + JSON.parse(localStorage.getItem('token')))
      .subscribe(
        (response) => {
          this.auth.setUserInfo(JSON.stringify(response['token']), 'token');
          res = response['user'].firstName;
          return res;
        },
        (error) => {
          if (error['status'] === 401) {
            this.auth.removeUserInfo();
            console.log("# TOKEN EXPIRED");
          }
          console.log("#getNameById : Erreur de chargement [service activity] : " + error);}
      );
    return res;
  }

}
