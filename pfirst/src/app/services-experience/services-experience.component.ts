import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {UserService} from '../services/users.service';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ModalHistoryComponent} from "../modal-history/modal-history.component";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-services-experience',
  templateUrl: './services-experience.component.html',
  styleUrls: ['./services-experience.component.css'],
  providers: [DatePipe, UserService]
})
export class ServicesExperienceComponent implements OnInit {

  history_for: any[] = new Array();
  history_by: any[] = new Array();
  idx: number;
  showAllComments: boolean;
  last_for: number;
  last_by: number;
  myName: string;
  reviewFor: any;
  reviewBy: any;
  id_user: number;
  @Input() allReviews: any;

  constructor(private datepipe: DatePipe,
              private usr_service: UserService,
              public matDialog: MatDialog,
              private activatedRoute: ActivatedRoute) {
  }


  ngOnInit(): void {
    this.activatedRoute.params.subscribe(
      (pars) => {
        this.usr_service.getUserHistory(pars['id'])
          .then( () => {
            this.id_user = pars['id'];
            this.history_for = this.usr_service.services_history_for;
            this.history_by = this.usr_service.services_history_by;
            console.log('history for: ', this.history_for);
            console.log('history_by :', this.history_by);
            this.last_for = this.history_for.length - 1;
            this.last_by = this.history_by.length - 1;
            //console.log('ANNOUNCEAUTHORID', this.history_for[this.last_for].idUser);
            this.idx = this.usr_service.idx;
            this.showAllComments = this.usr_service.showAllComments;
          })
          .catch( (e) => {
            console.log('ERREUR RECUP HISTORY DANS SERV EXP',e);
          });
        this.myName = JSON.parse(localStorage.getItem('user')).firstName;
      }
    );
    this.getReview();
    /* ne marche pas
this.historySub = this.usr_service.history_subject.subscribe(
  (newVal) => {
    this.history_for = this.usr_service.services_history_for;
    this.history_by = this.usr_service.services_history_by;
    console.log('history for: ', this.history_for);
    this.last_for = this.history_for.length - 1;
    this.last_by = this.history_by.length - 1;
    this.idx = this.usr_service.idx;
    this.showAllComments = this.usr_service.showAllComments;
    console.log(newVal);
  }
);*/
  }

  logUsrRev(){
    console.log(this.allReviews);
  }

  getAverageGrade() { // plus util normalement
    let grades = 0;
    let sum = 0;
    let res: number;
    this.history_for.forEach(elt => {
      sum = sum + elt.note , grades = grades + 1;
    });
    this.history_by.forEach(elt => {
      sum = sum + elt.note , grades = grades + 1;
    });
    res = (sum / grades) * 10;
    res = Math.round(res);
    return res / 10;
  }

  getReview() {
    this.reviewBy = {
      'note': 5,
      'comment': 'Au top'
    };
    this.reviewFor = {
      'note': 5,
      'comment': 'Au top'
    };
  }

  setAllComments() {
    /*this.history.forEach( serv => {
      serv.showComment = true;
    });
    this.showAllComments = true;*/
    this.usr_service.setShowAllComments();
    this.showAllComments = true;
    console.log('servExp : showAll set a true');
  }

  resetAllComments() {
    /*this.history.forEach( serv => {
      serv.showComment = false;
    });
    this.showAllComments = false;*/
    this.usr_service.resetShowAllComments();
    this.showAllComments = false;
    console.log('servExp : showAll reset a false');
  }

  openHistoryModal() {
    const dialogConfig = new MatDialogConfig();
    // The user can't close the dialog by clicking outside its body
    dialogConfig.disableClose = false;
    dialogConfig.id = "modal-history-component";
    dialogConfig.width = "60%";
    dialogConfig.height = "60%";
    // https://material.angular.io/components/dialog/overview
    const modalDialog = this.matDialog.open(ModalHistoryComponent, dialogConfig);
  }

}
