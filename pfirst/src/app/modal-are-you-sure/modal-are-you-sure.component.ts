import { Component, OnInit } from '@angular/core';
import {SuiviService} from '../services/suivi.service';
import {HttpClient} from '@angular/common/http';
import {AuthComponent} from '../auth/auth.component';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-modal-are-you-sure',
  templateUrl: './modal-are-you-sure.component.html',
  styleUrls: ['./modal-are-you-sure.component.css']
})
export class ModalAreYouSureComponent implements OnInit {

  constructor(public suiviServ : SuiviService, public httpClient : HttpClient, public auth : AuthService) { }

  public idAnnounce; //id de l'annonce à supprimer

  ngOnInit(): void {
    this.idAnnounce = this.suiviServ.serviceId_selected;
  }

  deleteAnnounce(){
    this.httpClient.delete(this.auth.backend + "api/announce/" + this.idAnnounce)
      .subscribe(
        (response) => {
          console.log("suppression ok");
          console.table(response);
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

