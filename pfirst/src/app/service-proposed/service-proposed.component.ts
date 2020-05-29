import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {UserService} from '../services/users.service';
import {SuiviService} from '../services/suivi.service';

@Component({
  selector: 'app-service-proposed',
  templateUrl: './service-proposed.component.html',
  styleUrls: ['./service-proposed.component.css']
})
export class ServiceProposedComponent implements OnInit {

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
  @Input() idAuthor : number;
  public noHelper: boolean;
  public isCollapsed: boolean = true;
  public isCollapsed_bis : boolean = true;
  public helpers: any[] = [];
  public response: number[];
  public assignees: number[] = [];
  assigneesSubscription: Subscription;
  public noAssignees: boolean;
  public finished : boolean;
  public myID : number;
  public enAttente : boolean;
  public refuse : boolean;
  public theme: string;
  public iAmAssignee : boolean;
  public accepted : boolean;
  public enCours : boolean;

  constructor(private httpClient: HttpClient, private auth: AuthService, public router: Router,
              public userService: UserService, private suiviServ: SuiviService) {
  }

  ngOnInit(): void {
    this.finished = false;
    this.getHelpers(this.id);
    this.getAssignees(this.id);
    this.myID = JSON.parse(localStorage.getItem('user'))['idUser'];

    this.amIanAssignee(this.myID);
    this.accepted = this.iAmAssignee && this.status === 0;
    this.enAttente = this.status === 0 && !this.iAmAssignee;
    this.refuse = this.status != 0 && !this.iAmAssignee;
    this.enCours = this.iAmAssignee && this.status === 1;
    if(this.accepted){
      this.theme = "accepted"
    }else if( this.refuse ){
      this.theme = "refused"
    }

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
        //console.log('#getHelpers - service-activity: erreur de recupération ', e);
        this.helpers = [];
      });
  }

  getUser() {
    return this.serviceUser;
  }

  getDescription() {
    return this.serviceDescription;
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

        this.amIanAssignee(this.myID);
        this.accepted = this.iAmAssignee && this.status === 0;
        this.enAttente = this.status === 0 && !this.iAmAssignee;
        this.enCours = this.iAmAssignee && this.status === 1;
        this.refuse = this.status != 0 && !this.iAmAssignee;
        if(this.accepted){
          this.theme = "accepted";
        }else if( this.refuse ){
          this.theme = "refused";
        }else if( this.enCours ){
          this.theme = "enCours";
        }else{
          this.theme = "basic";
        }
      })
      .catch((e) => {
        //console.log('#getAssignees - service-activity: erreur de recupération ', e);
        this.assignees = [];
      });
  }

  amIanAssignee(id: number){
    this.iAmAssignee = false;
    for (let assignee of this.assignees) {
      if (assignee === id ) {
        this.iAmAssignee = true;
      }
    }
  }





}
