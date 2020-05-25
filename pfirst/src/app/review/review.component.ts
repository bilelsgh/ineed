import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';
import {AuthService} from '../services/auth.service';
import {SuiviService} from "../services/suivi.service";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  announceId: number;
  rate = 0;
  successfullySended = {};
  ratedNames: string[] = new Array();
  announceAuthor: boolean;
  participants: number[] = new Array();
  idToName = {};
  idToImageNames = {};

  constructor(private httpClient: HttpClient,
              private route: ActivatedRoute,
              private authService: AuthService,
              private suiviService: SuiviService) {
  }

  ngOnInit(): void {
    this.announceId = this.route.snapshot.params.idAnnounce;
    this.getAuthor(this.announceId)
      .then( () => {
          if (this.announceAuthor){
            this.suiviService.getAssignees(this.announceId)
              .then( () => {
                this.participants = this.suiviService.assignees;
                this.participants.forEach( (part) => {
                  this.getName(part);
                });
              }).catch( (e) => {
              console.log('Erreur getAssignees', e);
            });
          } else {
            this.getName(this.participants[0]);
          }
      })
      .catch( (e) => {
        console.log(e);
      });
  }

  getName(idUsr: number){
    this.httpClient.get(this.authService.backend + 'api/user/' + idUsr + '?token=' + JSON.parse(localStorage.getItem('token')))
      .subscribe( (resp) => {
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

  getPdpPath(idUsr: number): string{
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
        console.log('SUCCESS REVIEW', resp);
        form.reset();
        this.successfullySended[idRated] = true;
      },
      (e) => {
        console.log('FAILURE REVIEW', e);
      }
    );
  }

}
