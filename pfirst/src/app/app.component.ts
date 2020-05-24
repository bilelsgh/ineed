import { Component, OnDestroy, OnInit } from '@angular/core';
import {AuthService} from "./services/auth.service";
import {NotificationService} from "./services/notification.service";
import {Subscription} from "rxjs";
import {Notif, NotifContext} from "./models/notification.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy{
  title = 'INEED';
  notifSubscription: Subscription;
  notifList: Notif[];

  constructor(public notificationService: NotificationService) {}

  ngOnInit(){
    this.notifList = this.notificationService.notifList;
    this.notifSubscription = this.notificationService.notifSubject.subscribe(
      (notifs) => {
        this.notifList = this.notificationService.notifList;
        //console.log(this.notifList);
      }
    );
  }

  ngOnDestroy() {
    this.notifSubscription.unsubscribe();
  }

  uploadTestNotif(){
    let myNot: Notif = new Notif('notif de test 1', 'info', '', 'infos');
    let myContext: NotifContext = new NotifContext('TESTING1');
    let myUSRID = JSON.parse(localStorage.getItem('user')).idUser;
    this.notificationService.uploadNotif(
      myNot,
      myContext,
      myUSRID
    );
  }

  updateNot(){
    let myNot: Notif = new Notif('Chargez votre première photo de profil !', 'info', '', 'infos');
    let myContext: NotifContext = new NotifContext('pdpUpload');
    let myUSRID = JSON.parse(localStorage.getItem('user')).idUser;
    this.notificationService.updateToTreated(this.notificationService.buildUpdater(myNot, myContext, myUSRID));
  }

  buildUp(){
    let myNot: Notif = new Notif('Chargez votre première photo de profil !', 'info', '', 'infos');
    let myContext: NotifContext = new NotifContext('pdpUpload');
    let myUSRID = JSON.parse(localStorage.getItem('user')).idUser;
    this.notificationService.buildUpdater(myNot, myContext, myUSRID);
  }
}
