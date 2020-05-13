import {Injectable} from "@angular/core";
import {from, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Notif} from "../models/notification.model";

@Injectable()
export class NotificationService {

  hasNew: boolean = false;
  notifList: Notif[] = new Array();
  userId: string = '-1';
  //listObservable = from(this.notifList);
  notifSubject = new Subject<Notif[]>();

  constructor(private httpClient: HttpClient) {

   let interval = setInterval(() => {
      this.watchNotifs();
    }, 5000);
  }

  emitNotifSubject(){
    this.notifSubject.next(this.notifList);
  }

  addNotif(not: Notif){
    this.notifList.push(not);
    this.emitNotifSubject();
  }
  watchNotifs(){
    if (this.hasNew){
      this.addNotif(new Notif('Nouvelle notif', 'info', 'testNotif'));
    }else{
      this.hasNew = true;
    }
  }
}
