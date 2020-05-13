import {Injectable} from "@angular/core";
import {from, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Notif} from "../models/notification.model";
import {NotifierService} from "angular-notifier";

@Injectable()
export class NotificationService {

  hasNew: boolean = true;
  notifList: Notif[] = new Array();
  alreadyNotified: Notif[] = new Array();
  userId: string = '-1';
  //listObservable = from(this.notifList);
  notifSubject = new Subject<Notif[]>();
  lastNotifIndex: number = 0;

  constructor(private httpClient: HttpClient,
              private notifierService: NotifierService) {

   let interval = setInterval(() => {
      this.watchNotifs();
    }, 5000);
  }

  emitNotifSubject(){
    this.notifSubject.next(this.notifList);
  }

  triggerNotif(not: Notif){
    this.notifierService.show({
      type: not.type,
      message: not.message,
      id: not.id
    });
    this.alreadyNotified.push(not);
  }

  addNotif(not: Notif){
    this.notifList.push(not);
    this.emitNotifSubject();
  }

  watchNotifs(){
    if (this.hasNew){
      this.addNotif(new Notif('Chargez une photo de profil', 'info', 'profilPic'));
      this.hasNew = false;
      this.notifList.forEach((elt)=>{
        if (!this.alreadyNotified.includes(elt)){
          this.triggerNotif(elt);
        }
      });
    }else{
      this.hasNew = false;
      //this.triggerNotif(this.notifList[this.lastNotifIndex]);
    }
  }
}
