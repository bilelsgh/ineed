import { Component, OnInit } from '@angular/core';
import {DatePipe} from '@angular/common';
import { UserService} from '../services/users.service';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ModalHistoryComponent} from "../modal-history/modal-history.component";

@Component({
  selector: 'app-services-experience',
  templateUrl: './services-experience.component.html',
  styleUrls: ['./services-experience.component.css'],
  providers: [DatePipe, UserService]
})
export class ServicesExperienceComponent implements OnInit {

  history_for: any[];
  history_by: any[];
  idx: number;
  showAllComments: boolean;

  constructor(private datepipe: DatePipe, private usr_service : UserService, public matDialog: MatDialog) {
  }

  ngOnInit(): void {
    this.history_for = this.usr_service.services_history_for;
    this.history_by = this.usr_service.services_history_by;
    this.idx=this.usr_service.idx;
    this.showAllComments = this.usr_service.showAllComments;
  }

  getAverageGrade() {
    let grades = 0;
    let sum = 0;
    this.history_for.forEach(elt => {
      sum = sum + elt.note , grades = grades + 1;
    });
    this.history_by.forEach(elt => {
      sum = sum + elt.note , grades = grades + 1;
    });
    return (sum / grades);
  }

  setAllComments(){
    /*this.history.forEach( serv => {
      serv.showComment = true;
    });
    this.showAllComments = true;*/
    this.usr_service.setShowAllComments();
    this.showAllComments=true;
    console.log('servExp : showAll set a true');
  }

  resetAllComments(){
    /*this.history.forEach( serv => {
      serv.showComment = false;
    });
    this.showAllComments = false;*/
    this.usr_service.resetShowAllComments();
    this.showAllComments = false;
    console.log('servExp : showAll reset a false');
  }

  openHistoryModal(){
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
