import {Injectable} from "@angular/core";
import {from, Subject} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Notif, NotifContext} from "../models/notification.model";
import {NotifierService} from "angular-notifier";
import {AuthService} from "./auth.service";
import {keyframes} from "@angular/animations";

@Injectable()
export class NotificationService {

  //hasNew: boolean = true;
  notifList: Notif[] = new Array();
  alreadyNotified: Notif[];
  userId: string = '-1';
  //listObservable = from(this.notifList);
  notifSubject = new Subject<Notif[]>();
  lastNotifIndex: number = 0;
  watcher: any;

  constructor(private httpClient: HttpClient,
              private notifierService: NotifierService,
              private authService: AuthService) {
    //trigger périodique de la fonction de récupération des notifs -> provoqué à la connexion
    //this.wakeWatcher(5000);

    this.alreadyNotified = new Array();
    //installation des notifs firebase
    /*  upload auto pour tests
    this.uploadNotif(
      new Notif("Notification de test", "warning"),
      new NotifContext(JSON.parse(localStorage.getItem('user')).idUser),
      JSON.parse(localStorage.getItem('user')).idUser);
    //this.updateNotifCache(true);
    this.uploadNotif(
      new Notif("Notif test 2", "info"),
      new NotifContext(JSON.parse(localStorage.getItem('user')).idUser),
        JSON.parse(localStorage.getItem('user')).idUser);
     */
  }

  wakeWatcher(freq: number) {
    this.watcher = setInterval(() => {
      this.watchNotifs();
    }, freq);
  }

  sleepWatcher() {
    clearInterval(this.watcher);
  }

  uploadNotif(not: Notif, context: NotifContext, userId: string) {
    /* params :
        not -> la notification à ajouter
        context -> spécifie l'id de celui qui emet la notification et l'id de l'annonce si ca en concerne une
        userId -> l'id de l'user à qui s'adresse la notif
     */
    this.httpClient.post(this.authService.backend + 'api/notification',{
      'UserID':userId,
      'content':JSON.stringify(not),
      'context': JSON.stringify(context)
    })
      .subscribe(
        (resp) => {
          console.log("#Successfully added a new notif :", not);
        },
        (e) => {
          console.log('#Unable to add a new notif', e);
        }
      );
    /* version firebase
    this.httpClient.post<Notif>(this.authService.backend_test + 'notifications.json', not)
      .subscribe(
        (resp) => {
          console.log('#Successfully added a new notif : ', not);
        },
        (err) => {
          console.log('#Unable to add a new notif', err);
        }
      );*/
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

  // approche plus modulaire, pas utilisée pour l'instant
  handleContext(not: Notif, myContext: NotifContext): Notif {
    let res: Notif = not;
    if ( myContext.emitterId != JSON.parse(localStorage.getItem('user')).idUser) {
      //the notif has been uploaded by another user
      if (myContext.announceId != '-1') {
        //the notif is indeed about an announce
        if (myContext.detail.split('By')[0] === 'helpProposed'){
          //when proposing help, the notif detail is set to helpProposedBy<user.firstName>
          res.message = myContext.detail.split('By')[1] + 'vous propose son aide !';
        }
      }
    }
    return not;
  }

  getNoticationFromBack() {

    return new Promise((resolve, reject) => {
      //this.httpClient.get<Notif[]>(this.authService.backend_test + 'notifications.json')
      this.httpClient.get(this.authService.backend + 'api/notification/User?token=' + JSON.parse(localStorage.getItem('token')))
        .subscribe(
          (got) => {
            const backNotifs = got['notifications'];
            this.notifList.length = 0; //on vide les notifs pour faciliter l'adaptation des formats de notif back et front
            backNotifs.forEach( (oneBackNotif) => {
              const notifToPush = <Notif> JSON.parse(backNotifs.content);
              notifToPush.idNot = oneBackNotif['idNotification'];
              // const oneBackContext = <NotifContext> JSON.parse(oneBackNotif.context); // sera utilisé si on veut
              // améliorer en ayant une approche plus modulaire
              this.notifList.push(notifToPush);
            });
            this.emitNotifSubject();
            this.authService.setUserInfo(got['token'], 'token');

            /* firebase
            let notifIds = Object.keys(got);
            this.notifList = notifIds.map(key => got[key]);
            this.notifList.forEach((elt, idx) => {
              elt.idNot = notifIds[idx];
            });
            this.emitNotifSubject();
            console.log("GOT :", got);*/

            resolve('Got the notifications');
          },
          (err) => {
            reject('Cannot get the notifications');
          }
        );
    });
  }

  /*
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
    }*/

  emitNotifSubject() {
    this.notifSubject.next(this.notifList);
  }

  triggerNotif(not: Notif) {
    this.notifierService.show({
      type: not.type,
      message: not.message,
      id: not.idNot
    });
    console.log("Triggered notif because ", this.alreadyNotified, "doesnt contains ", not);
    console.log("Proof this.alreadyNotified.some(notif => notif.id === not.id ):", this.alreadyNotified.some(notif => notif.idNot === not.idNot));
    if (this.alreadyNotified.length > 0) {
      console.log("Indeed indexable : this.alreadyNotified[0].id = ", this.alreadyNotified[0].idNot == not.idNot);
    }
    this.alreadyNotified.push(not);
  }

  watchNotifs() {
    //this.addNotif(new Notifx('Chargez une photo de profil', 'info', 'profilPic'));
    //this.hasNew = false;
    this.getNoticationFromBack()
      .then((secondMsg) => {
        console.log('notifList :', this.notifList);
        for (let i in this.notifList) {
          if (!this.alreadyNotified.some(notif => notif.idNot === this.notifList[i].idNot)) {
            this.triggerNotif(this.notifList[i]);
          }
        }
        console.log(secondMsg);
      })
      .catch((secondMsg) => {
        console.log(secondMsg);
      });
  }
}
