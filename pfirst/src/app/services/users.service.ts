import {EventEmitter, Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AuthService} from './auth.service';
import {Subject} from "rxjs";
import {MatSnackBarComponent} from '../mat-snack-bar/mat-snack-bar.component';


@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient, private auth: AuthService, private snackBar : MatSnackBarComponent) {
  }

  dark_theme : boolean = false;
  light_theme : boolean = true;
  darkThemeSubject = new Subject<boolean>();
  lightThemeSubject = new Subject<boolean>();

  info_user: any;
  notifications: string[] = [
    'post-inscription'
  ];

  currentReviews: any[] = new Array();

  active_announces: any[];
  announceHelpers: any[];
  public services_proposed_finished : any[] = [];

  categ_to_icon = {
    "accompagnement": "../../assets/data/accompagner.png",
    "course": "../../assets/data/courses.png",
    "cuisine": "../../assets/data/cuisine.png",
    "menage": "../../assets/data/menage.png"
  };


  services_history_for: any[] = new Array();
  services_history_by: any[] = new Array();
  announceAndAuthorToReview = {};


  idx = 0;

  showAllComments: boolean = false;

  getUserHistory(userID: string = JSON.parse(localStorage.getItem('user')).idUser) {
    return new Promise( (resolve, reject) => {
      this.httpClient.get(this.auth.backend + 'api/announce/historique/' + userID +'?token=' + JSON.parse(localStorage.getItem('token')))
        .subscribe(
          (got) => {

            let by = got['historique'];
            by.forEach( (serv) => {
              serv.content = JSON.parse(serv.content);
            });
            this.services_history_by = by;
            let histFor = got['make'];
            histFor.forEach( (serv) => {
              serv.content = JSON.parse(serv.content);
            });
            console.log("HISTORIQUE : ", typeof got['historique'][0]['content']);
            this.services_history_for = histFor;
            this.auth.setUserInfo(JSON.stringify(got['token']), 'token');

              console.log("HISTORYSUB EMITTED");
            resolve(true);
          },
          (e) => {
            console.log("#User service : cant get the history");
            reject(e);
          }
        );
    });
  }

  setShowAllComments() {
    this.showAllComments = true;
    console.log('userServ : showAll set a true');
  }

  resetShowAllComments() {
    this.showAllComments = false;
    console.log('userServ : showAll reset a false');
  }

  getNiveau(): number {
    return (Math.floor((this.services_history_for.length + this.services_history_by.length) / 5) + 1);//pour le moment 5 services dans chaque niveau
  }

  saveUserInfosToServer() {
    this.httpClient.put(this.auth.backend + 'userInfos.json', this.services_history_for)
      .subscribe(() => {
        console.log('save done');
      }, (err) => {
        if (err['status'] === 401) {
          this.auth.removeUserInfo();
          console.log("#TOKEN EXPIRED");
        }
        console.log('Erreur de save ' + err);
      });
  }

  getUserInfosFromServer() {
    this.httpClient
      .get<any[]>(this.auth.backend)
      .subscribe((got) => {
          this.services_history_for = got;
        },
        (err) => {
          if (err['status'] === 401) {
            this.auth.removeUserInfo();
            console.log("#TOKEN EXPIRED");
          }
          console.log("Erreur de récupération" + err);
        }
      );
  }

  // -----------------REVIEWS--------------
  getReviews(idReceiver: number) {
    return new Promise( (resolve, reject) => {
      this.httpClient.get(this.auth.backend + 'api/review/user/' + idReceiver + '?token=' + JSON.parse(localStorage.getItem('token')))
        .subscribe(
          (got) => {
            console.log("GOT REVIEWS FOR RECEIVER = ", idReceiver, ' : ', got);
            this.currentReviews = got['reviews'];
            console.log('set currentreviews', this.currentReviews);
            this.auth.setUserInfo(JSON.stringify(got['token']), 'token');
            resolve('Got the reviews');
          },
          (e) => {
            console.log('COULDNT GET THE REVIEWS', e);
            this.currentReviews.length = 0;
            reject(e);
          }
        );
    });
  }

  setDicoAnnounceIds(){
    this.services_history_by.forEach( (oneServ) => {
      this.announceAndAuthorToReview[oneServ.idAnnounce] = {};
    });
    this.services_history_for.forEach( (oneServ) => {
      this.announceAndAuthorToReview[oneServ.idAnnounce] = {};
    });
  }

  associateReviewToAuthorAndAnnounce(){
    this.currentReviews.forEach( (oneRev) => {
      this.announceAndAuthorToReview[oneRev.announce][oneRev.author] = oneRev;
    });
  }

  public getInitials() {
    let res: string = this.info_user['fname'][0].toUpperCase() + this.info_user['lname'][0].toUpperCase();
    console.log(res);
    return res;
  }


  // variante avec id en param pour différents users -> besoin de differentes url pr differents profils (PLUS UTILE)
  getProfilById(id: string) {
    console.log("#IDUSERgetProfil : " + id);
    return new Promise((resolve, reject) => {
      this.httpClient
        .get<any[]>(this.auth.backend + 'api/user/' + id +
          '?token=' + JSON.parse(localStorage.getItem('token')))
        .subscribe(
          (response) => {
            console.log("#GETPROFILBYID");
            console.log(response);
            this.info_user = response['user'];
            //this.auth.setUserInfo(JSON.stringify(response['user']), 'current_profil'); //on stocke les infos de l'utilisateur récupérée dans le local storage
            this.auth.setUserInfo(JSON.stringify(response['token']), 'token');
            /*this.info_user = response;
            console.log("#OK");
            console.log("#SERVICES : " + response);*/
            resolve(true);
          },
          (error) => {
            if (error['status'] === 401) {
              this.auth.removeUserInfo();
              console.log("#TOKEN EXPIRED");
            }
            console.log("Erreur de chargement : " + error);
            reject(true);
          }
        );
    });
  };




  getPostedAnnounces(idUsr: string) {
    return new Promise((resolve, reject) => {

      /*

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        })
      };
*/
      const params = new HttpParams().set('token', JSON.parse(localStorage.getItem('token')));
      //const usrId = JSON.parse(localStorage.getItem('user'))['idUser'];

      this.httpClient
        .get<any[]>(this.auth.backend + 'api/announce/user/' + idUsr, {params})   //from backend

        .subscribe(
          (response) => {
            /*for backend*/
            this.active_announces = response['announces'];
            //console.table(response['announces']);
            this.auth.setUserInfo(JSON.stringify(response['token']), 'token');

            resolve(true);
          },
          (error) => {
            if (error['status'] === 401) {
              this.auth.removeUserInfo();
              console.log("#TOKEN EXPIRED");
            }
            console.log("#getPostedA() :Erreur de chargement : ", error);

            reject(true);
          }
        );
    });
  };

  lightTheme(){
    this.dark_theme = false;
    this.light_theme = true;
    this.emitLightThemeSubject();
    this.emitDarkThemeSubject();
    this.snackBar.openSnackBar("Mode jour activé","","dark-mode",'bottom', 'end');

  }
  darkTheme(){
    this.dark_theme = true;
    this.light_theme = false;
    this.emitLightThemeSubject();
    this.emitDarkThemeSubject();
    this.snackBar.openSnackBar("Mode nuit activé","","light-mode", 'bottom', 'end');

  }

  emitDarkThemeSubject() {
    console.log('DARK');
    this.darkThemeSubject.next(this.dark_theme);
  }

  emitLightThemeSubject(){
    console.log('LIGHT');
    this.lightThemeSubject.next(this.light_theme);
  }


  getAnnounceHelpersById(announceId: string) {
    return new Promise(((resolve, reject) => {
      const params = new HttpParams().set('token', JSON.parse(localStorage.getItem('token')));

      this.httpClient.get<any[]>(this.auth.backend + 'api/announce/' + announceId + '/helpers', {params})
        .subscribe(
          (response) => {
            this.announceHelpers = response['helpers'];
            this.auth.setUserInfo(JSON.stringify(response['token']),'token');
            //console.log('#getAnnounceHelpers : success', response);
            resolve(true);
          },
          (error) => {
            if (error['status'] == 400){
              console.log("BAD REQUEST : token expired or announce deleted")
            }
            console.log('#getAnnounceHelpers : failure');
            reject(true);
          }
        );
    }));
  }

}
