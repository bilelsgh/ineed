import { Component, OnInit } from '@angular/core';
import {SuiviService} from '../services/suivi.service';
import {HttpClient} from '@angular/common/http';
import {AuthComponent} from '../auth/auth.component';
import {AuthService} from '../services/auth.service';
import {MatDialogRef} from '@angular/material/dialog';
import {NotificationService} from "../services/notification.service";
import {Notif, NotifContext} from "../models/notification.model";

@Component({
  selector: 'app-modal-are-you-sure',
  templateUrl: './modal-are-you-sure.component.html',
  styleUrls: ['./modal-are-you-sure.component.css']
})
export class ModalAreYouSureComponent implements OnInit {

  constructor(public suiviServ : SuiviService,
              public httpClient : HttpClient, public auth : AuthService,
              public matDialogRef: MatDialogRef<ModalAreYouSureComponent>,
              private notificationService: NotificationService) { }

  public idAnnounce; //id de l'annonce à supprimer

  ngOnInit(): void {
    this.idAnnounce = this.suiviServ.serviceId_selected;
  }

  deleteAnnounce(){
    this.httpClient.delete(this.auth.backend + "api/announce/" + this.idAnnounce + "?token=" + JSON.parse(localStorage.getItem('token')))
      .subscribe(
        (response) => {
          console.log("suppression ok");
          console.table(response);
          this.suiviServ.deleted(this.idAnnounce);
          this.notificationService.updaterProposed.forEach( (oneHelpUpdater) => {
            if ( +(oneHelpUpdater.split('announce')[1]) == this.idAnnounce){
              this.notificationService.updateToTreated(oneHelpUpdater);
              // @ts-ignore
              this.notificationService.uploadNotif(
                  new Notif(`${JSON.parse(localStorage.getItem('user')).firstName}a cpmmencé un service sans vous, votre aide a donc été refusée...`, 'error', '', 'activity'),
                  new NotifContext('helpRefused', JSON.parse(localStorage.getItem('user')).idUser, this.idAnnounce),
                  +(oneHelpUpdater.split('helpProposed')[0])
              );
            }
          });
          this.matDialogRef.close();
        },
        (error) => {
          if (error['status'] === 401) {
            this.auth.removeUserInfo();
            console.log('#TOKEN EXPIRED');
          }
        }
      )
  }

  }

