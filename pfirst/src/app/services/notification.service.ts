import {Injectable} from "@angular/core";
import {from, Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {Notif} from "../models/notification.model";
import {NotifierService} from "angular-notifier";
import {AuthService} from "./auth.service";

@Injectable()
export class NotificationService {

  hasNew: boolean = true;
  notifList: Notif[] = new Array();
  alreadyNotified: Notif[] = new Array();
  userId: string = '-1';
  //listObservable = from(this.notifList);
  notifSubject = new Subject<Notif[]>();
  lastNotifIndex: number = 0;
  watcher: any;

  constructor(private httpClient: HttpClient,
              private notifierService: NotifierService,
              private authService: AuthService) {
    //trigger périodique de la fonction de récupération des notifs
    this.wakeWatcher(5000);

    //installation des notifs firebase
    this.uploadNotif(new Notif("Notification de test firebase", "warning", "testFb"));
    this.updateNotifCache(true);
    this.uploadNotif(new Notif("Notif 2", "info", "not2"));
  }

  wakeWatcher(freq: number) {
    this.watcher = setInterval(() => {
      this.watchNotifs();
    }, freq);
  }

  sleepWatcher(){
    clearInterval(this.watcher);
  }

  uploadNotif(not: Notif) {
    //this.notifList.push(not);
    this.httpClient.post<Notif>(this.authService.backend_test + 'notifications.json', not)
      .subscribe(
        (resp) => {
          console.log('#Successfully added a new notif : ', not);
        },
        (err) => {
          console.log('#Unable to add a new notif', err);
        }
      );
  }

  updateNotifCache(toCheck: boolean) {
    this.httpClient.put(this.authService.backend_test + 'cacheNotif.json', toCheck)
      .subscribe(
        (resp) => {
          console.log('#Successfully set the cache', resp);
        },
        (err) => {
          console.log('#Unable to set the cache', err);
        }
      );
  }

  getNoticationFromBack() {
    return new Promise((resolve, reject) => {
      this.httpClient.get<Notif[]>(this.authService.backend_test + 'notifications.json')
        .subscribe(
          (got) => {
            this.notifList = got;
            resolve('Got the notifications');
          },
          (err) => {
            reject('Cannot get the notifications');
          }
        );
    });
  }

  checkNotifCache() {
    return new Promise(((resolve, reject) => {
      this.httpClient.get<boolean>(this.authService.backend_test + 'cacheNotif.json')
        .subscribe(
          (result) => {
            this.hasNew = result;
            resolve('Checked the cache');
          },
          (err) => {
            reject('Unable to check the cache');
          }
        );
    }));
  }

  emitNotifSubject() {
    this.notifSubject.next(this.notifList);
  }

  triggerNotif(not: Notif) {
    this.notifierService.show({
      type: not.type,
      message: not.message,
      id: not.id
    });
    this.alreadyNotified.push(not);
  }

  addNotif(not: Notif) {
    this.notifList.push(not);
    this.emitNotifSubject();
  }

  watchNotifs() {
    this.checkNotifCache()
      .then((msg) => {
        console.log(msg);
        if (this.hasNew) {
          //this.addNotif(new Notifx('Chargez une photo de profil', 'info', 'profilPic'));
          this.hasNew = false;
          this.getNoticationFromBack()
            .then((secondMsg) => {
              console.log('notifList :', this.notifList);
              for (let i in this.notifList) {
                if (!this.alreadyNotified.some(notif => notif.id === this.notifList[i].id)) {
                  this.triggerNotif(this.notifList[i]);
                }
              }
              //this.alreadyNotified = this.notifList;
              console.log(secondMsg);
            })
            .catch((secondMsg) => {
              console.log(secondMsg);
            });
        }
      })
      .catch((msg) => {
        console.log(msg);
      });
  }
}
