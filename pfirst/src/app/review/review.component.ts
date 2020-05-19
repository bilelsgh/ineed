import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css']
})
export class ReviewComponent implements OnInit {

  announceId: string;
  constructor(private httpClient: HttpClient,
              private route: ActivatedRoute) {}
  ngOnInit(): void {
    this.announceId = this.route.snapshot.params['id'];
  }

}
