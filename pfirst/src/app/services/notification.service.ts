import {Injectable} from "@angular/core";
import {from, Subject} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Notif, NotifContext} from "../models/notification.model";
import {NotifierService} from "angular-notifier";
import {AuthService} from "./auth.service";

@Injectable()
export class NotificationService {

  //hasNew: boolean = true;
  notifList: Notif[] = new Array();
  alreadyNotified: Notif[] = new Array();
  userId: string = '-1';
  //listObservable = from(this.notifList);
  notifSubject = new Subject<Notif[]>();
  lastNotifIndex: number = 0;
  watcher: any;
  reviewNeededIds: number[] = new Array();
  reviewNeededIdsSubject = new Subject<any[]>();
  updaterRefused: string[] = new Array();
  updaterProposed: string[] = new Array();
  notifsDelayed: any[] = new Array(); // des opérations sont faites sur la liste de notif telles qu'elle peut ne pas
                                      // etre a jour au moment de l'appel à certaines fonctions

  constructor(private httpClient: HttpClient,
              private notifierService: NotifierService,
              private authService: AuthService) {
    //trigger périodique de la fonction de récupération des notifs -> provoqué à la connexion
    //this.wakeWatcher(5000);

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

  emitReviewNeededIds(){
    this.reviewNeededIdsSubject.next(this.reviewNeededIds.slice());
  }

  uploadNotif(not: Notif, context: NotifContext, userId: number) {
    /* params :
        not -> la notification à ajouter
        context -> spécifie l'id de celui qui emet la notification et l'id de l'annonce si ca en concerne une
        userId -> l'id de l'user à qui s'adresse la notif
        notUpdater -> une string unique pour chaque notif permettant de l'identifier dans la db
     */
    this.httpClient.post(this.authService.backend + 'api/notification?token=' + JSON.parse(localStorage.getItem('token')),{
      'userId':userId,
      'content':JSON.stringify(not),
      'context': JSON.stringify(context),
      'updater': this.buildUpdater(not, context, userId)
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

  buildUpdater(not: Notif, notContext: NotifContext, idUsr: number){
    /* Méthode de construction de l'updater (identifie une notif de manière):
      <emitterId> + <detail> + <idUser> + announce + <announceId>
     */
    let res: string;
    res = '';
    res += notContext.emitterId;
    res += notContext.detail;
    res += idUsr;
    res += 'announce';
    res += notContext.announceId;
    //console.log('Constructed updater with not =', not, '; notContext = ', notContext, '; idUsr = ', idUsr);
    console.log('Resulting updater = ', res);
    return res;
  }

  updateToTreated(notUpdater: string){
    console.log('ABOUT TO UPDATE WIH NOTUPDATER =', notUpdater);
    this.httpClient.put(this.authService.backend + 'api/notification/update', {
      'token': JSON.parse(localStorage.getItem('token')),
      'updater': notUpdater
    }).subscribe(
      (resp) => {
        console.log("Successfully updated notif",resp);
        this.authService.setUserInfo(JSON.stringify(resp['token']), 'token');
      },
      (e) => {
        console.log('couldnt update notif', e);
      }
    );
  }

  getNoticationFromBack() {
    return new Promise((resolve, reject) => {
      //this.httpClient.get<Notif[]>(this.authService.backend_test + 'notifications.json')
      this.httpClient.get(this.authService.backend + 'api/notification/user?token=' + JSON.parse(localStorage.getItem('token')))
        .subscribe(
          (got) => {
            this.authService.setUserInfo(JSON.stringify(got['token']), 'token');
            const backNotifs = got['notifications'];
            this.notifsDelayed = this.notifList;
            this.notifList.length = 0; //on vide les notifs pour faciliter l'adaptation des formats de notif back et front
            this.updaterProposed.length = 0;
            backNotifs.forEach( (oneBackNotif) => {
              const notifToPush = JSON.parse(oneBackNotif.content);
              console.log('notifToPush', notifToPush);
              console.log('oneBackNotif :', oneBackNotif);
              const revUpdater = this.buildUpdater(notifToPush, JSON.parse(oneBackNotif.context), 18);
              this.handleReviews(revUpdater);
              if (JSON.parse(oneBackNotif.context).detail == 'helpRefused'){
                const updaterRefToPush = this.buildUpdater(JSON.parse(oneBackNotif.content), JSON.parse(oneBackNotif.context), JSON.parse(localStorage.getItem('user')).idUser);
                if (!this.updaterRefused.includes(updaterRefToPush)){
                  this.updaterRefused.push(updaterRefToPush);
                }
              }
              if (JSON.parse(oneBackNotif.context).detail == 'helpProposed'){
                const updaterPropToPush = this.buildUpdater(JSON.parse(oneBackNotif.content), JSON.parse(oneBackNotif.context), JSON.parse(localStorage.getItem('user')).idUser);
                  this.updaterProposed.push(updaterPropToPush);
              }
              notifToPush.idNot = oneBackNotif['idNotification'];
              // const oneBackContext = <NotifContext> JSON.parse(oneBackNotif.context); // sera utilisé si on veut
              // améliorer en ayant une approche plus modulaire
              this.notifList.push(notifToPush);
            });
            this.notifsDelayed = this.notifList;
            console.log('REVIEWSID', this.reviewNeededIds);
            this.emitNotifSubject();
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

  handleReviews(myUpdater: string) {
    console.log("In HandleReviews");
    if (myUpdater.includes('reviewExpected')) {
      let separated: string[] = myUpdater.split('reviewExpected');
      let sepAgain = separated[1].split('announce');
      if (!this.reviewNeededIds.includes(+sepAgain[1])){
        this.reviewNeededIds.push(+sepAgain[1]);
        this.emitReviewNeededIds();
      }
    }
  }

  hideEachAndEveryNotif(){
    this.notifierService.hideAll();
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

  resetDisplay() {
    this.notifierService.hideAll();
    this.notifsDelayed.forEach( (oneNot) => {
      this.notifierService.show(oneNot);
    });
  }

  // approche plus modulaire, pas utilisée pour l'instant
  handleContext(not: Notif, myContext: NotifContext): Notif {
    let res: Notif = not;
    if ( myContext.emitterId != JSON.parse(localStorage.getItem('user')).idUser) {
      //the notif has been uploaded by another user
      if (myContext.announceId != -1) {
        //the notif is indeed about an announce
        if (myContext.detail.split('By')[0] === 'helpProposed'){
          //when proposing help, the notif detail is set to helpProposedBy<user.firstName>
          res.message = myContext.detail.split('By')[1] + 'vous propose son aide !';
        }
      }
    }
    return not;
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
