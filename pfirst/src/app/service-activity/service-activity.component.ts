import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {UserService} from '../services/users.service';
import {SuiviService} from '../services/suivi.service';
import {Subscription} from 'rxjs';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ModalAreYouSureComponent} from '../modal-are-you-sure/modal-are-you-sure.component';
import {Notif, NotifContext} from "../models/notification.model";
import {NotificationService} from "../services/notification.service";

@Component({
  selector: 'app-service-activity',
  templateUrl: './service-activity.component.html',
  styleUrls: ['./service-activity.component.css']
})
export class ServiceActivityComponent implements OnInit, OnDestroy {

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
  name_assignees  = {};
  public deleted : number[];
  deleteSubscription : Subscription;

  constructor(private httpClient: HttpClient,
              private auth: AuthService, public router: Router,
              public userService: UserService,
              private suiviServ: SuiviService,
              public dialog: MatDialog,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.deleted = [];
    this.getAssignees(this.id);
    this.getHelpers(this.id);
    this.deleteSubscription = this.suiviServ.deleteSubject.subscribe(
      (response: number[]) => {
        this.deleted = response;
      }
    );
    this.suiviServ.emiteDeleteSubject();

  }

  ngOnDestroy() {
    //On supprime les notifications de proposition d'aide si le service a été lancé
    if (this.status > 0) {
      this.notificationService.updaterProposed.forEach( (oneUp) => {
        if (+(oneUp.split('announce')[1]) == this.id) {
          this.notificationService.updateToTreated(oneUp);
          this.notificationService.uploadNotif(
            new Notif(JSON.parse(localStorage.getItem('user')).firstName + ' a lancé son service, votre aide a été refusée...','error', '', 'activity'),
            new NotifContext('helpRefused', JSON.parse(localStorage.getItem('user')).idUser, this.id),
            +oneUp.split('helpProposed')[0]
          );
        }
      });
    }
  }

  getHelpers(announceId: number = 0) {
    this.suiviServ.getHelpers(this.id)
      .then( () => {
        console.log("Récupération des helpers dans service-activity OK - " , announceId);
        this.helpers = this.suiviServ.helpers;
        console.table(this.helpers);
        this.noHelper = this.suiviServ.noHelper;
        let nb_noHelpers = 0;
        for(let helper of this.helpers){
          console.log("#ID: ", helper.idUser, " -> amIassigne : ", this.amIanAssignee(helper.idUser) , ", amIrejected : ", this.amIrejected(helper.idUser));
          if(this.amIanAssignee(helper.idUser) || this.amIrejected(helper.idUser)){
            nb_noHelpers++;
          }

        }
        console.log("Nb no helpers : ", nb_noHelpers);
        if(nb_noHelpers != 0){
          this.noHelper = true;
        }

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
          const proposedUpdater = this.notificationService.buildUpdater(
            new Notif('proposition d\'aide', 'info', '', 'activity'),
            new NotifContext('helpProposed', helperID, this.id),
            JSON.parse(localStorage.getItem('user')).idUser
          );
          this.notificationService.updateToTreated(proposedUpdater);
          this.notificationService.uploadNotif(
            new Notif(JSON.parse(localStorage.getItem('user')).firstName + ' a acceptée votre aide !', 'success', '', 'activity'),
            new NotifContext('helpAccepted', JSON.parse(localStorage.getItem('user')).idUser, this.id),
            helperID
          );
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
        for(let assignee of this.assignees){
          //Récupération du nom de l'assignee
          this.httpClient
            .get<any[]>(this.auth.backend + 'api/user/' + assignee +
              '?token=' + JSON.parse(localStorage.getItem('token')))
            .subscribe(
              (response) => {
                this.auth.setUserInfo(JSON.stringify(response['token']), 'token');
                this.name_assignees[assignee] = response['user'].firstName;
              },
              (error) => {
                if (error['status'] === 401) {
                  this.auth.removeUserInfo();
                  console.log("# TOKEN EXPIRED");
                }
                console.log("#getNameById : Erreur de chargement [service activity] : " + error);}
            );
        }
      })
      .catch((e) => {
        console.log('#getAssignees - service-activity: erreur de recupération ', e);
        this.assignees = [];
      });
  }

  amIanAssignee(id: number): boolean {
    let res = false;
    for (let assignee of this.assignees) {
      //console.log(assignee, " == ", id, " : ", assignee === id );
      if (assignee === id ) {
        res = true;
      }
    }
    return res;
  }

  startService() {
    //L'annonce est en cours, le statut passe à 1
    let message = {token: JSON.parse(localStorage.getItem('token')),
      announce: {idUser: this.service_descriptor.idUser , content: JSON.stringify(this.service_descriptor.content), id: this.service_descriptor.id,
        price: this.service_descriptor.price, viewNumber: this.service_descriptor.viewNumber, status: 1} };

    this.httpClient
      .put(this.auth.backend + 'api/announce/' + this.id, message )
      .subscribe(
        (response) => {
          this.auth.setUserInfo(JSON.stringify(response['token']), 'token'); //mise à jour du token
          this.assignees.forEach( (oneAssignee) => {
            /*On supprime toutes les notifs d'acceptation des utilisateurs pour laisser celles de service en cours*/
            // -> suppression de l'acceptation
            //envoi de la notif de service en cours
            this.notificationService.uploadNotif(
              new Notif(JSON.parse(localStorage.getItem('user')).firstName + ' a lancé son service !', 'warning', '', 'activity'),
              new NotifContext('serviceStart', JSON.parse(localStorage.getItem('user')).idUser,this.id),
              oneAssignee
            );
          });
          this.notificationService.uploadNotif(
            new Notif('Vous avez actuellement un service en cours !', 'warning', '', 'activity'),
            new NotifContext('serviceStart', JSON.parse(localStorage.getItem('user')).idUser,this.id),
            JSON.parse(localStorage.getItem('user')).idUser
          );
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
          this.assignees.forEach( (oneAssignee) => {
            /*On supprime la notif de service en cours et on prévient d'une demande de review*/
            // -> suppression de notif de service en cours
            const updaterStart = this.notificationService.buildUpdater(
              new Notif('Vous avez actuellement un service en cours !', 'warning', '', 'activity'),
              new NotifContext('serviceStart', JSON.parse(localStorage.getItem('user')).idUser, this.id),
              oneAssignee
            );
            this.notificationService.updateToTreated(updaterStart);
            //on envoie la notif de review
            this.notificationService.uploadNotif(
              new Notif(JSON.parse(localStorage.getItem('user')).firstName + ' attend votre évaluation, dirigez vous dans votre activité !', 'info', '', 'activity'),
              new NotifContext('reviewExpected', JSON.parse(localStorage.getItem('user')).idUser, this.id),
              oneAssignee
            );
          });
          //Meme chose pour l'auteur de l'annonce
          const updaterStart = this.notificationService.buildUpdater(
            new Notif('Vous avez actuellement un service en cours !', 'warning', '', 'activity'),
            new NotifContext('serviceStart', JSON.parse(localStorage.getItem('user')).idUser, this.id),
            JSON.parse(localStorage.getItem('user')).idUser
          );
          this.notificationService.updateToTreated(updaterStart);
          this.notificationService.uploadNotif(
            new Notif('Un service terminé attend votre évaluation, dirigez vous dans votre activité !', 'info', '', 'activity'),
            new NotifContext('reviewExpected', JSON.parse(localStorage.getItem('user')).idUser, this.id),
            JSON.parse(localStorage.getItem('user')).idUser
          );

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

  openDialog(){
    this.suiviServ.serviceId_selected =  this.id;
    const dialogRef = this.dialog.open(ModalAreYouSureComponent, {
      width: '650px',
      data: {id : this.id}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  refuse(id : number){
    let content = this.service_descriptor.content;
    content["rejected"].push(id);
    console.log(this.deleted);

    //L'annonce est terminée, le statut passe à 2
    let message = {token: JSON.parse(localStorage.getItem('token')),
      announce: {idUser: this.service_descriptor.idUser , content: JSON.stringify(content), id: this.service_descriptor.id,
        price: this.service_descriptor.price, viewNumber: this.service_descriptor.viewNumber, status: this.service_descriptor.status} };

    this.httpClient
      .put(this.auth.backend + 'api/announce/' + this.id, message )
      .subscribe(
        (response) => {
          this.auth.setUserInfo(JSON.stringify(response['token']), 'token'); //mise à jour du token
          console.log("ID : ", id, " refusé !");
          const proposedUpdater = this.notificationService.buildUpdater(
            new Notif('Vous avez une nouvelle proposition d\'aide', 'info', '', 'activity'),
            new NotifContext('helpProposed', id, this.id),
            JSON.parse(localStorage.getItem('user')).idUser
          );
          this.notificationService.updateToTreated(proposedUpdater);
          this.notificationService.uploadNotif(
            new Notif('Votre proposition d\'aide a été refusée', 'warning', '', 'activity'),
            new NotifContext('helpRefused', JSON.parse(localStorage.getItem('user')).idUser, this.id),
            id
          );
        },
        (error) => {
          if (error['status'] === 401) {
            this.auth.removeUserInfo();
            console.log(' #TOKEN EXPIRED');
          }
        }
      );
  }

  amIrejected(id : number) : boolean{
    let rejected = this.service_descriptor.content['rejected'];

    for(let elt of rejected){
      if(elt === id){
        return true;
      }
    }
    return false;
  }

}
