import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import {NgForm} from '@angular/forms';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  announceId: string;
  rate = 0;
  successfullySended: boolean;
  ratedName = '';

  constructor(private httpClient: HttpClient,
              private route: ActivatedRoute,
              private authService: AuthService) {}
  ngOnInit(): void {
    this.successfullySended = false;
    this.announceId = this.route.snapshot.params.idAnnounce;
    this.ratedName = this.route.snapshot.params.ratedName;
  }

  onSubmitReview(form: NgForm) {
    const comment: string = form.value.comment;
    this.httpClient.post(this.authService.backend + 'api/review', {
      token: JSON.parse(localStorage.getItem('token')),
      review: {
        announce: this.announceId,
        content: comment,
        author: JSON.parse(localStorage.getItem('user')).idUser,
        note: this.rate
      }
    }).subscribe(
      (resp) => {
        console.log('SUCCESS REVIEW', resp);
        form.reset();
        this.successfullySended = true;
      },
      (e) => {
        console.log('FAILURE REVIEW', e);
      }
    );
  }

}
