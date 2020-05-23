import {Component, Input, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {UserService} from '../services/users.service';
import {SuiviService} from "../services/suivi.service";
import {AuthService} from "../services/auth.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-former-service',
  templateUrl: './former-service.component.html',
  styleUrls: ['./former-service.component.css'],
  providers: [DatePipe, UserService]
})
export class FormerServiceComponent implements OnInit {

  showComment: boolean;
  menage: boolean;
  accompagnement: boolean;
  cuisine: boolean;
  course: boolean;
  img_paths: any;

  descriptCategorie =
    {
      "menage": "à faire le ménage",
      "cuisine": "en lui préparant un bon petit plat",
      "accompagnement": "en l'accompagnant",
      "course": "à faire ses courses"
    };

  @Input() helperLook: boolean; // vrai si c'est celui qui aide visualise ce service
  @Input() pour: string;
  @Input() par: string;
  @Input() note: any;
  @Input() date: any;
  @Input() commentaire: string;
  @Input() announceId: number;
  @Input() imgSrc: string;
  participants: any[];
  idToNames = {};
  idToShowReview = {};
  idToReviews = {};

  constructor(public datepipe: DatePipe,
              private usr_serv: UserService,
              private suiviService: SuiviService,
              private auth: AuthService,
              private httpClient: HttpClient,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getAssignees(this.announceId)
      .then(() => {
        this.participants.forEach((part) => {
          this.getAssigneeName(part);
          this.idToShowReview[part] = false;
        });
      })
      .catch((e) => {
        console.log(e);
      });

    //this.showComment=this.usr_serv.showAllComments;
    /*
    this.img_paths = this.usr_serv.categ_to_icon;
    this.menage = (this.categorie === "menage");
    this.accompagnement = (this.categorie === "accompagnement");
    this.course = (this.categorie === "course");
    this.cuisine = this.categorie === "cuisine";
    // this.setBool();*/
  }

  getReview(idUsr) {
    if (!Object.keys(this.idToReviews).includes(idUsr)) {
      this.idToReviews[idUsr] = {
        'note': 5,
        'comment': 'Au top'
      };
    }
  }


  getAssignees(id: number = 0) {
    return new Promise((resolve, reject) => {

      if (id === 0) {
        this.participants = [];
      } else {
        this.httpClient
          .get<any[]>(this.auth.backend + 'api/announce/' + id + '/accepted?token=' + JSON.parse(localStorage.getItem('token')))
          .subscribe(
            (response) => {
              this.participants = response['accepted'];
              if (!this.participants.includes(JSON.parse(localStorage.getItem('user')).idUser)) {
                this.participants.push(JSON.parse(localStorage.getItem('user')).idUser);
              }
              this.auth.setUserInfo(JSON.stringify(response['token']), 'token'); //mise à jour du token
              //  console.log("GET ASSIGNEES : " + id);
              //console.table(response['accepted']);
              resolve(true);
            },
            (error) => {
              if (error['status'] === 401) {
                this.auth.removeUserInfo();
                console.log('#TOKEN EXPIRED');
              }
              console.log('#DEBUG : Erreur lors de la récupération des assignees [service-activity] ' + error);
              reject(error);
            }
          );
      }
    });
  }

  getAssigneeName(assigneeID: number) {
    if (this.idToNames[assigneeID] != null) {
      return;
    }
    this.httpClient.get(this.auth.backend + 'api/user/' + assigneeID + '?token=' + JSON.parse(localStorage.getItem('token')))
      .subscribe(
        (resp) => {
          this.idToNames[assigneeID] = resp['user'].firstName;
          this.auth.setUserInfo(JSON.stringify(resp['token']), 'token');
        },
        (e) => {
          console.log("CANT GET ASSIGNEE NAME", e);
        }
      );
  }

  goToProfil(idUsr: number) {
    this.router.navigate(['profil/' + idUsr]);
  }

  /*
    setBool(){
      if (this.categorie === "menage") {
        this.menage = true;
        this.accompagnement = false;
        this.cuisine = false;
        this.course = false;
      }else if (this.categorie === "cuisine") {
        this.menage = false;
        this.accompagnement = false;
        this.cuisine = true;
        this.course = false;
      }else if (this.categorie === "course") {
        this.menage = false;
        this.accompagnement = false;
        this.cuisine = false;
        this.course = true;
      }else if (this.categorie === "accompagnement"){
        this.menage = false;
        this.accompagnement = true;
        this.cuisine = false;
        this.course = false;
      }
    }*/
  getDescript() {
    let date = '' + this.datepipe.transform(this.date, 'yyyy/MM/dd');
    let note = '' + this.note;
    let comment = this.commentaire;
    return [date, note, comment];
  }

  setComment() {
    this.showComment = true;
  }

  unsetComment() {
    this.showComment = false;
  }

}
