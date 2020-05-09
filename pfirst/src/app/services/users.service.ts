import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {AuthService} from './auth.service';

@Injectable()
export class UserService {

  constructor(private httpClient: HttpClient, private auth: AuthService) {
  }

  info_user: any;
  notifications: string[] = [
    'post-inscription'
  ];

  active_announces: any[];

  announceHelpers: any[];

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

  ngOnInit() {
    this.getUserInfosFromServer();
  }

  idx = 0;

  showAllComments: boolean = false;

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

  getUserInfosFromToken() {
    return new Promise((resolve, reject) => {
      this.info_user = JSON.parse(localStorage.getItem('token'))['user'];
      console.log("GetfromToken : this.info_user =", this.info_user);
      if (this.info_user != undefined) {
        resolve(true);
      } else {
        reject(true);
      }
    });
  }

  // variante avec id en param pour différents users -> besoin de differentes url pr differents profils (PLUS UTILE)
  getProfilById(id: string = 'current_user') {
    return new Promise((resolve, reject) => {
      if (id === "current_user") {
        this.info_user = JSON.parse(localStorage.getItem('token'))['user'];
        console.table(this.info_user);
        if (this.info_user != null) {
          resolve(true);
        } else {
          reject(true);
        }
      } else {
        this.httpClient
          .get<any[]>(this.auth.backend + 'api/user/' + id +
            '?token=' + JSON.parse(localStorage.getItem('token')))
          .subscribe(
            (response) => {
              console.log("#GETPROFILBYID");
              console.table(response);
              this.auth.setUserInfo(JSON.stringify(response['user']), 'current_profil'); //on stocke les infos de l'utilisateur récupérée dans le local storage
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
      }
    });
  }


  getPostedAnnounces(idUsr: string) {
    return new Promise((resolve, reject) => {

      /*
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': localStorage.getItem('token')
        })
      };
*/
      const params = new HttpParams().set('token', JSON.parse(localStorage.getItem('token')));
      //const usrId = JSON.parse(localStorage.getItem('user'))['idUser'];

      this.httpClient
        .get<any[]>(this.auth.backend + 'api/announce/user/' + idUsr, {params})   //from backend
        //.get<any[]>(this.auth.backend + 'api/announce/user/'+ idUsr +'?token='+ JSON.parse(localStorage.getItem('token')))
        //.get(this.auth.backend_test + 'actives.json')     //from firebase

        .subscribe(
          (response) => {
            /*for backend*/
            this.active_announces = response['announces'];
            console.log("ICI : ", typeof response['token'], JSON.stringify(response['token']));
            console.log(response);
            this.auth.setUserInfo(JSON.stringify(response['token']), 'token');

            /*for firebase
            this.active_announces = <any[]> response;
             */

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
            console.log("#getPostedA() :Erreur de chargement : ", error);
            reject(true);
          }
        );
    });
  }


  getAnnounceHelpersById(announceId: string) {
    return new Promise(((resolve, reject) => {
      const params = new HttpParams().set('token', JSON.parse(localStorage.getItem('token')));

      this.httpClient.get<any[]>('api/announce/' + announceId + '/helpers', {params})
        .subscribe(
          (response) => {
            this.announceHelpers = response;
            console.log('#getAnnounceHelpers : success', response);
            resolve(true);
          },
          (error) => {
            console.log('#getAnnounceHelpers : failure');
            reject(true);
          }
        );
    }));
  }
}
