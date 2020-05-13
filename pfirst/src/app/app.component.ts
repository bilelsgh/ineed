import { Component, OnDestroy, OnInit } from '@angular/core';
import {AuthService} from "./services/auth.service";
import {NotificationService} from "./services/notification.service";
import {Subscription} from "rxjs";
import {Notif} from "./models/notification.model";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'INEED';
  notifSubscription: Subscription;
  notifList: Notif[];

  constructor(public notificationService: NotificationService) {}

  ngOnInit(){
    this.notifList = this.notificationService.notifList;
    this.notifSubscription = this.notificationService.notifSubject.subscribe(
      (notifs) => {
        this.notifList = this.notificationService.notifList;
        console.log(this.notifList);
      }
    );
  }

  ngOnDestroy() {
    this.notifSubscription.unsubscribe();
  }
}
