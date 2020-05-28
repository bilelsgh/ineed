import {Injectable} from "@angular/core";
import {from, Subject} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Notif, NotifContext} from "../models/notification.model";
import {NotifierService} from "angular-notifier";
import {AuthService} from "./auth.service";

@Injectable()
export class NotificationService {

  notifList: Notif[] = new Array(); // contient les notifs de l'user
  notifsDelayed: any[] = new Array(); // des opérations sont faites sur la liste de notif telles qu'elle peut ne pas etre a
                                      // jour au moment de l'appel à certaines fonctions, on sauvegarde donc un état valide
  alreadyNotified: Notif[] = new Array(); // pour ne pas afficher plusieurs fois la même notif
  notifSubject = new Subject<Notif[]>();
  watcher: any; // id retourné par la fonction setInterval() qui permet de stoper celle-ci après
  reviewNeededIds: number[] = new Array(); // Id des annonces qui ont besoin de review
  reviewNeededIdsSubject = new Subject<any[]>();
  /* On récupère les updaters des notifs à supprimer une fois qu'elles sont 'lues' */
  updaterRefused: string[] = new Array(); //updaters des Notifs d'aide refusée
  updaterAccepted: string[] = new Array(); //updaters des notifs d'aide acceptée
  updaterProposed: string[] = new Array(); //updaters des notifs d'aide proposée


  constructor(private httpClient: HttpClient,
              private notifierService: NotifierService,
              private authService: AuthService) {
    if (this.authService.isAuthenticated()) {
      //trigger périodique de la fonction de récupération des notifs -> provoqué à la connexion
      this.wakeWatcher(10000); // si l'utilisateur est toujours connecté, on lance le watcher
    }

  }

  wakeWatcher(freq: number) {
    // la fonction watchNotifs() est appelée toutes les <freq> ms
    this.watcher = setInterval(() => {
      this.watchNotifs();
    }, freq);
  }

  sleepWatcher() {
    // stop l'execution periodique de watchNotifs()
    clearInterval(this.watcher);
  }

  watchNotifs() {
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

  emitReviewNeededIds() {
    this.reviewNeededIdsSubject.next(this.reviewNeededIds.slice());
  }

  uploadNotif(not: Notif, context: NotifContext, userId: number) {
    /* params :
        not -> la notification à ajouter
        context -> spécifie l'id de celui qui emet la notification, l'id de l'annonce si ca en concerne une et l'action
                   associée à la notif
        userId -> l'id de l'user à qui s'adresse la notif
        notUpdater -> une string unique pour chaque notif permettant de l'identifier dans la db, utilisée pour
                      désactivation d'une notif
     */
    this.httpClient.post(this.authService.backend + 'api/notification?token=' + JSON.parse(localStorage.getItem('token')), {
      'userId': userId,
      'content': JSON.stringify(not),
      'context': JSON.stringify(context),
      'updater': this.buildUpdater(not, context, userId)
    })
      .subscribe(
        (resp) => {
          //notif bien insérée
        },
        (e) => {
          if (e['status'] === 401) {
            this.authService.removeUserInfo();
            console.log('#TOKEN EXPIRED');
          }
          console.log('#Unable to add a new notif', e);
        }
      );
  }

  buildUpdater(not: Notif, notContext: NotifContext, idUsr: number) {
    /* Méthode de construction de l'updater (identifie une notif de manière unique):
      <emitterId> + <detail> + <idUser> + announce + <announceId>
     */
    let res: string;
    res = '';
    res += notContext.emitterId + notContext.detail + idUsr + 'announce' + notContext.announceId;
    return res;
  }

  updateToTreated(notUpdater: string) {
    // met a jour les notifs qui ont le meme updater comme 'traitée' (une seule notif en théorie)
    this.httpClient.put(this.authService.backend + 'api/notification/update', {
      'token': JSON.parse(localStorage.getItem('token')),
      'updater': notUpdater
    }).subscribe(
      (resp) => {
        this.authService.setUserInfo(JSON.stringify(resp['token']), 'token');
      },
      (e) => {
        if (e['status'] === 401) {
          this.authService.removeUserInfo();
          console.log('#TOKEN EXPIRED');
        }
        console.log('couldnt update notif', e);
      }
    );
  }

  getNoticationFromBack() {
    /*
    Récupère les notifs de la base de données pour l'user courant et met à jour les attributs de classe
    */
    return new Promise((resolve, reject) => {
      if (this.authService.isAuthenticated()) {
        this.httpClient.get(this.authService.backend + 'api/notification/user?token=' + JSON.parse(localStorage.getItem('token')))
          .subscribe(
            (got) => {
              this.authService.setUserInfo(JSON.stringify(got['token']), 'token');
              const backNotifs = got['notifications'];
              this.reviewNeededIds.length = 0; //Si une notif de review a été désactivée, la liste doit etre mise a jour
              this.notifsDelayed = this.notifList;
              this.notifList.length = 0; //on vide les notifs pour faciliter l'adaptation des formats de notif back et front
              this.updaterProposed.length = 0; //Si une notif de review a été désactivée, la liste doit etre mise a jour
              this.updaterRefused.length = 0;
              backNotifs.forEach((oneBackNotif) => {
                const notifToPush = JSON.parse(oneBackNotif.content);
                const revUpdater = this.buildUpdater(notifToPush, JSON.parse(oneBackNotif.context), 18);
                this.handleReviews(revUpdater);
                console.log('------------------', JSON.parse(oneBackNotif.context));
                if (JSON.parse(oneBackNotif.context).detail == 'helpRefused') {
                  const updaterRefToPush = this.buildUpdater(JSON.parse(oneBackNotif.content), JSON.parse(oneBackNotif.context), JSON.parse(localStorage.getItem('user')).idUser);
                  if (!this.updaterRefused.includes(updaterRefToPush)) {
                    this.updaterRefused.push(updaterRefToPush);
                  }
                }
                if (JSON.parse(oneBackNotif.context).detail == 'helpAccepted') {
                  const updaterAccToPush = this.buildUpdater(JSON.parse(oneBackNotif.content), JSON.parse(oneBackNotif.context), JSON.parse(localStorage.getItem('user')).idUser);
                  if (!this.updaterAccepted.includes(updaterAccToPush)) {
                    this.updaterAccepted.push(updaterAccToPush);
                  }
                }
                if (JSON.parse(oneBackNotif.context).detail == 'helpProposed') {
                  const updaterPropToPush = this.buildUpdater(JSON.parse(oneBackNotif.content), JSON.parse(oneBackNotif.context), JSON.parse(localStorage.getItem('user')).idUser);
                  this.updaterProposed.push(updaterPropToPush);
                }
                notifToPush.idNot = oneBackNotif['idNotification'];
                // const oneBackContext = <NotifContext> JSON.parse(oneBackNotif.context); // sera utilisé si on veut
                // améliorer en ayant une approche plus modulaire
                this.notifList.push(notifToPush);
              });
              this.notifsDelayed = this.notifList;
              this.emitNotifSubject();
              resolve('Got the notifications');
            },
            (err) => {
              if (err['status'] === 401) {
                //this.authService.removeUserInfo();
                this.sleepWatcher();
              }
              reject('Cannot get the notifications');
            }
          );
      } else {
        this.sleepWatcher();
        reject('Cannot get the notifications');
      }
    });
  }

  handleReviews(myUpdater: string) {
    //ajoute l'id de l'annonce qui a besoin d'une review a partir de l'updater
    if (myUpdater.includes('reviewExpected')) {
      let separated: string[] = myUpdater.split('reviewExpected');
      let sepAgain = separated[1].split('announce');
      if (!this.reviewNeededIds.includes(+sepAgain[1])) {
        this.reviewNeededIds.push(+sepAgain[1]);
        this.emitReviewNeededIds();
      }
    }
  }

  hideEachAndEveryNotif() {
    this.notifierService.hideAll();
  }

  resetDisplay() {
    this.notifierService.hideAll();
    this.notifsDelayed.forEach((oneNot) => {
      this.notifierService.show(oneNot);
    });
  }

  // approche plus modulaire, pas utilisée pour l'instant
  handleContext(not: Notif, myContext: NotifContext): Notif {
    let res: Notif = not;
    if (myContext.emitterId != JSON.parse(localStorage.getItem('user')).idUser) {
      //the notif has been uploaded by another user
      if (myContext.announceId != -1) {
        //the notif is indeed about an announce
        if (myContext.detail.split('By')[0] === 'helpProposed') {
          //when proposing help, the notif detail is set to helpProposedBy<user.firstName>
          res.message = myContext.detail.split('By')[1] + 'vous propose son aide !';
        }
      }
    }
    return not;
  }

  emitNotifSubject() {
    this.notifSubject.next(this.notifList);
  }

  triggerNotif(not: Notif) {
    // affiche une notification
    this.notifierService.show({
      type: not.type,
      message: not.message,
      id: not.idNot
    });
    this.alreadyNotified.push(not);
  }
}
