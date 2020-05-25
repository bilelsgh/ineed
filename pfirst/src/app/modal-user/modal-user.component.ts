import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {UserService} from '../services/users.service';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {MatSpinner} from "@angular/material/progress-spinner";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {NotificationService} from "../services/notification.service";
import {Subscription} from "rxjs";
import {Notif} from "../models/notification.model";
import {Subject} from "rxjs";

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.css'],
  animations: [
    trigger('reduce', [
      state('inactive', style({
        transform: 'scale(5)'
      })),
      state('active', style({
        transform: 'scale(1)'
      })),
      transition('inactive => active', animate('800ms ease-in')),
    ]),
    trigger('extend', [
      state('inactive', style({
        width: '140px'
      })),
      state('active', style({
        width: '150px'
      })),
      transition('inactive => active', animate('800ms')),
  ]),
],
})
export class ModalUserComponent implements OnInit {
  stateExtend: string = 'inactive';
  stateReduce: string = 'inactive';
  isLoading: boolean = true;
  numberOfInfoNotif: number = 0;
  numberOfProfilNotif: number = 0;
  numberOfActivityNotif: number = 0;
  notifSubscription: Subscription;
  notifList: Notif[];

  constructor(private userserv: UserService,
              public matDialogRef: MatDialogRef<ModalUserComponent>,
              private httpClient: HttpClient,
              private auth: AuthService,
              private router: Router,
              private notificationService: NotificationService){}

  ngOnInit(): void {
    setTimeout( ()=>{
      //this.hasInfoNotif = true;
      this.numberOfProfilNotif = 0;
      this.isLoading = false;
      //this.hasActivityNotif = true;
    }, 500);

    setTimeout( ()=>{
      this.stateReduce = 'active';
      this.stateExtend = 'active';
    },500);

    this.notifList = this.notificationService.notifList;
    this.numberOfProfilNotif = this.selectElementsforCategory(this.notifList, "profil").length;
    this.numberOfInfoNotif = this.selectElementsforCategory(this.notifList, "infos").length;
    this.numberOfActivityNotif = this.selectElementsforCategory(this.notifList, "activity").length;

    /*
    this.notifSubscription = this.notificationService.notifSubject
      .subscribe(
        (list) => {
          this.notifList = list;
          this.numberOfProfilNotif = this.selectElementsforCategory(this.notifList, "profil").length;
          this.numberOfInfoNotif = this.selectElementsforCategory(this.notifList, "infos").length;
          this.numberOfActivityNotif = this.selectElementsforCategory(this.notifList, "activity").length;
        }
      );*/

  }

  selectElementsforCategory(tab: Notif[], cat: string): Notif[]{
    if (tab === undefined){
      return [];
    }
    let res: Notif[] = new Array();
    tab.forEach( (elt) => {
      if (elt.category === cat){
        res.push(elt);
      }
    });
    return res;
  }

  getUserId():string{
    return JSON.parse(localStorage.getItem('user')).idUser;
  }

  goThenClose(where: string){
    this.router.navigate([where]);
    this.matDialogRef.close();
  }


}
