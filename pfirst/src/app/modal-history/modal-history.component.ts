import {Component, Inject, OnInit} from '@angular/core';
//import { ViewChild } from '@angular/core';
//import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import {UserService} from "../services/users.service";
import {HttpClient} from "@angular/common/http";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-modal-history',
  templateUrl: './modal-history.component.html',
  styleUrls: ['./modal-history.component.css']
})
export class ModalHistoryComponent implements OnInit{

  history_for: any[] = new Array();
  history_by: any[] = new Array();

  showFor: boolean = true;
  showBy: boolean = false;
  myName: string = '';

  index_for: number;
  index_by: number;

  review: any;
  allReviews: any;

  constructor(private userService: UserService,
              private httpClient: HttpClient,
              private matDialogRef: MatDialogRef<ModalHistoryComponent>,
              private route: ActivatedRoute,
              @Inject(MAT_DIALOG_DATA) data){
    this.allReviews = data.allReviews;
  }

  ngOnInit(): void {
    this.myName = JSON.parse(localStorage.getItem('user')).firstName;
    //console.log("MYNAME : ", this.myName);
    this.history_by = this.userService.services_history_by;
    this.history_for = this.userService.services_history_for;
    //console.log('Modal history : history_by = ', this.history_by);
    //console.log('Modal history : history_for = ', this.history_for);
    this.index_by = this.history_by.length - 1;
    this.index_for = this.history_for.length - 1;
    //console.log('Modal history : announceAuthorId', this.history_by[this.index_by].idUser);
    //console.log("datejour : ", this.history_by[this.index_by].content.datejour);
    this.getReview();
    /*
    this.route.params.subscribe( (whatever)=>{
      this.matDialogRef.close();
    });*/
  }

  incIndex() {
    if (this.showFor) {
      this.index_for++;
      if (this.index_for >= this.history_for.length) {
        this.index_for = 0;
      }
    } else {
      this.index_by++;
      if (this.index_by >= this.history_by.length) {
        this.index_by = 0;
      }
    }
  }

  getReview() {
    //a synchro avec le back
    this.review = {
      'note': 5,
      'comment': 'Super'
    };
    //console.log("got review");
  }

  decIndex() {
    if (this.showFor) {
      this.index_for--;
      if (this.index_for < 0) {
        this.index_for = this.history_for.length - 1;
      }

    } else {
      this.index_by--;
      if (this.index_by < 0) {
        this.index_by = this.history_by.length - 1;
      }
    }
  }

  setFor() {
    this.showBy = false;
    this.showFor = true;
  }


  setBy() {
    this.showFor = false;
    this.showBy = true;
  }
}
