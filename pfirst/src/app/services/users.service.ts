import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {subscribeOn} from 'rxjs/operators';
import {AuthService} from './auth.service';
import {Subject} from "rxjs";


@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient, private auth: AuthService) {
  }

  dark_theme : boolean = false;
  light_theme : boolean = true;
  darkThemeSubject = new Subject<boolean>();
  lightThemeSubject = new Subject<boolean>();


  info_user: any;
  notifications: string[] = [
    'post-inscription'
  ];

  services_history_for = [
    {
      pour: "Gilbert",
      par: "Bibel",
      categorie: "menage",
      note: 4.3,
      commentaire: 'Tres bon service pour vous',
      date: new Date(),
      showComment: false
    },
    {
      pour: "Gilbert",
      par: "Dhomas",
      categorie: "cuisine",
      note: 4.7,
      commentaire: 'Au top',
      date: new Date(),
      showComment: false
    },
    {
      pour: "Gilbert",
      par: "Rafel",
      categorie: "accompagnement",
      note: 4.5,
      commentaire: 'Super!',
      date: new Date(),
      showComment: false
    }
  ];
  services_history_by = [
    {
      pour: "Bibel",
      par: "Gilbert",
      categorie: "course",
      note: 4.2,
      commentaire: 'Tres bon service par vous',
      date: new Date(),
      showComment: false
    },
    {
      pour: "Bibel",
      par: "Gilbert",
      categorie: "menage",
      note: 4.3,
      commentaire: 'Tres bon service par vous',
      date: new Date(),
      showComment: false
    },
    {
      pour: "Domas",
      par: "Gilbert",
      categorie: "cuisine",
      note: 4.7,
      commentaire: 'Au top',
      date: new Date(),
      showComment: false
    },
    {
      pour: "Rafel",
      par: "Gilbert",
      categorie: "accompagnement",
      note: 4.5,
      commentaire: 'Super!',
      date: new Date(),
      showComment: false
    }
  ];
  categ_to_icon = {
    "accompagnement": "../../assets/data/accompagner.png",
    "course": "../../assets/data/courses.png",
    "cuisine": "../../assets/data/cuisine.png",
    "menage": "../../assets/data/menage.png"
  };

  idx = 0;

  showAllComments: boolean = false;

  active_announces: any[];

  getUserHistory(){
    return new Promise( (resolve, reject) => {
      this.httpClient.get(this.auth.backend + 'api/announce/historique?token=' + JSON.parse(localStorage.getItem('token')))
        .subscribe(
          (got) => {

            let by = got['Historique'];
            by.forEach( (serv) => {
              serv.content = JSON.parse(serv.content);
            });
            this.services_history_by = by;
            //this.services_history_by = got['Historique'];
            console.log("HISTORIQUE : ", typeof got['Historique'][0]['content']);
            this.services_history_for.length = 0;
            //this.services_history_for = got['make'];
            this.auth.setUserInfo(JSON.stringify(got['token']), 'token');
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

  getPostedAnnounces(id: string = 'user') {
    return new Promise((resolve, reject) => {

      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': localStorage.getItem('token')
        })
      };

      this.httpClient
        .get<any[]>(this.auth.backend + '/api/announce/user/' + id, httpOptions)
        .subscribe(
          (response) => {
            console.log("#GETPOSTEDANNOUNCES");
            console.table(response)
            this.active_announces = response['announces'];
            this.auth.setUserInfo(JSON.stringify(response['token']), 'token');

            /*this.info_user = response;
            console.log("#OK");
            console.log("#SERVICES : " + response);*/
            resolve(true);
          },
          (error) => {
            if (error['status'] === 401) {
              //this.auth.removeUserInfo();
              console.log("#TOKEN EXPIRED");
            }
            console.log("Erreur de chargement : " + error);
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

  }
  darkTheme(){
    this.dark_theme = true;
    this.light_theme = false;
    this.emitLightThemeSubject();
    this.emitDarkThemeSubject();
  }

  emitDarkThemeSubject() {
    console.log('DARK');
    this.darkThemeSubject.next(this.dark_theme);
  }

  emitLightThemeSubject(){
    console.log('LIGHT');
    this.lightThemeSubject.next(this.light_theme);
  }

}
