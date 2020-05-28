import {Component, OnDestroy, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {SuiviService} from "../services/suivi.service";
import {NotificationService} from "../services/notification.service";
import {Notif, NotifContext} from "../models/notification.model";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit, OnDestroy {

  announceId: number;
  rate = 0;
  successfullySended = {};
  ratedNames: string[] = new Array();
  announceAuthor: boolean;
  participants: number[] = new Array();
  idToName = {};
  idToImageNames = {};
  announceAuthorId: number;
  alreadyRated = {};

  constructor(private httpClient: HttpClient,
              private route: ActivatedRoute,
              private authService: AuthService,
              private suiviService: SuiviService,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.announceId = this.route.snapshot.params.idAnnounce;
    this.getAuthor(this.announceId)
      .then(() => {
        if (this.announceAuthor) {
          this.suiviService.getAssignees(this.announceId)
            .then(() => {
              this.participants = this.suiviService.assignees;
              this.participants.forEach((part) => {
                this.getName(part);
                this.alreadyRated[part] = false;
              });
            }).catch((e) => {
          });
        } else {
          this.getName(this.participants[0]);
          this.alreadyRated[this.participants[0]] = false;
        }
      })
      .catch((e) => {
        ////console.log(e);
      });
  }

  ngOnDestroy() {
    let allRated = true;
    Object.keys(this.successfullySended).forEach( (oneToRate) => {
      if (!this.successfullySended[oneToRate]) {
        if (!this.alreadyRated[+oneToRate]) {
          allRated = false;
        }
      }
    });
    if (allRated) {
      const revUpdater = this.notificationService.buildUpdater(
        new Notif('donnez une évaluation !', 'warning', '', 'activity'),
        new NotifContext('reviewExpected', this.announceAuthorId, this.announceId),
        JSON.parse(localStorage.getItem('user')).idUser
      );
      this.notificationService.updateToTreated(revUpdater);
    }

  }

  getName(idUsr: number) {
    this.httpClient.get(this.authService.backend + 'api/user/' + idUsr + '?token=' + JSON.parse(localStorage.getItem('token')))
      .subscribe((resp) => {
        this.idToName[idUsr] = resp['user'].firstName;
        this.idToImageNames[idUsr] = resp['user'].photo;
        this.successfullySended[idUsr] = false;
        this.authService.setUserInfo(JSON.stringify(resp['token']), 'token');
      });
  }

  getAuthor(annId: number) {
    return new Promise((resolve, reject) => {
      this.httpClient.get(this.authService.backend + 'api/announce/' + annId + "?token=" + JSON.parse(localStorage.getItem('token')))
        .subscribe((resp) => {
            this.announceAuthorId = resp['announce'].idUser;
            this.announceAuthor = JSON.parse(localStorage.getItem('user')).idUser == resp['announce'].idUser;
            if (!this.announceAuthor) {
              this.participants.push(resp['announce'].idUser);
            }
            this.authService.setUserInfo(JSON.stringify(resp['token']), 'token');
            resolve(true);
          },
          (e) => {
            resolve(e);
          });
    });
  }

  getPdpPath(idUsr: number): string {
    const res = this.authService.backend + 'static/images/' + this.idToImageNames[idUsr];
    return res;
  }

  onSubmitReview(form: NgForm, idRated: number) {
    const comment: string = form.value.comment;
    this.httpClient.post(this.authService.backend + 'api/review', {
      token: JSON.parse(localStorage.getItem('token')),
      review: {
        announce: this.announceId,
        content: comment,
        author: JSON.parse(localStorage.getItem('user')).idUser,
        note: this.rate,
        receiver: idRated
      }
    }).subscribe(
      (resp) => {
        //console.log('SUCCESS REVIEW', resp);
        form.reset();
        this.successfullySended[idRated] = true;
      },
      (e) => {
        if (e.status === 401){
          this.authService.removeUserInfo();
        }else if (e.status === 500){
          this.alreadyRated[idRated] = true;
        }
        //console.log('FAILURE REVIEW', e);
      }
    );
  }

}
