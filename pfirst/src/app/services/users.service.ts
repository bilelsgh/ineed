import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
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

  idx = 0;

  showAllComments: boolean = false;
  getParticipants(idAnnounce: number){
    let res: any[] =  new Array();
    res.push({'content':{
        'fname': 'Participant1',
        'idUser': 13
      }
    });
    res.push({'content':{
        'fname': 'Participant2',
        'idUser': 14
      }
    });
    return res;
  }

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
            let histFor = got['make'];
            histFor.forEach( (serv) => {
              serv.content = JSON.parse(serv.content);
            });
            console.log("HISTORIQUE : ", typeof got['Historique'][0]['content']);
            this.services_history_for = histFor;
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

  }
<<<<<<< HEAD
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

=======

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

  getServiceProposedAndFinished(){
    return new Promise(((resolve, reject) => {
      this.httpClient //checker si on met le helperID dans la route
        .get<any[]>(this.auth.backend + 'api/announce/historique?token=' +
          JSON.parse(localStorage.getItem('token'))) //route à vérifier
        .subscribe(
          (response) => {
            console.log('Service proposed & finished');
            console.table(response);
            this.services_proposed_finished = response;
            resolve(true);
          },
          (error) => {
            reject(true);
            if (error['status'] === 401) {
              this.auth.removeUserInfo();
              console.log("#TOKEN EXPIRED");
            }
            console.log("Erreur récupération des services proposés #user.service");
          }
        );
    }));
  }


>>>>>>> activity
}
