import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {UserService} from '../services/users.service';

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
  noHelper: boolean;
  public isCollapsed: boolean = true;
  public isCollapsed_bis : boolean = true;
  public helpers: any[] = [];
  public response: number[];
  public assignees: number[] = [];


  constructor(private httpClient: HttpClient, private auth: AuthService, public router: Router,
              private userService: UserService) {
  }

  ngOnInit(): void {
    this.response = new Array(50); // taille arbitraire (il ne devrait pas y avoir + de 50 services en cours)
    this.getHelpers(this.id);
    this.getAssignees(this.id);
  }

  getHelpers(announceId: number = 0) {
    console.log("HELPERS : " + announceId);
    if (announceId === 0) {   //pas d'annonce selectionée
      this.helpers = [];
    } else {
      this.userService.getAnnounceHelpersById(String(announceId))
        //this.userService.getAnnounceHelpersById(announceId)
        .then(() => {
          this.helpers = this.userService.announceHelpers;
          this.helpers.length === 0 ? this.noHelper = true : this.noHelper = false;
        })
        .catch((e) => {
          console.log('#getHelpers : erreur de recupération ', e);
          this.helpers = [];
        });
    }
  }

  getUser() {
    return this.serviceUser;
  }

  getDescription() {
    return this.serviceDescription;
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
    if (id === 0) {   //pas d'annonce selectionée
      this.assignees = [];
    }else{
      console.log("GET ASSIGNEES : " + id);
      this.httpClient
        .get<any[]>(this.auth.backend + 'api/announce/' + id + '/accepted?token=' + JSON.parse(localStorage.getItem('token')))
        .subscribe(
          (response) => {
            this.assignees = response['accepted'];
            this.status = response['status'];
            this.auth.setUserInfo(JSON.stringify(response['token']), 'token'); //mise à jour du token
            console.log("GET ASSIGNEES : " + id);
            console.table(response['accepted']);
          },
          (error) => {
            if (error['status'] === 401) {
              this.auth.removeUserInfo();
              console.log('#TOKEN EXPIRED');
            }
            console.log('#DEBUG : Erreur lors de la récupération des assignees [service-activity] ' + error);
          }
        );
    }
  }

  amIanAssignee(id: number): boolean {
    for (let assignee of this.assignees) {
      if (assignee['idUser'] === id ) {
        return true;
      }
    }
    return false;
  }

}
