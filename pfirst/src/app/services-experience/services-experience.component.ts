import { Component, OnInit } from '@angular/core';
import {DatePipe} from '@angular/common';
import { UserService} from '../services/users.service';

@Component({
  selector: 'app-services-experience',
  templateUrl: './services-experience.component.html',
  styleUrls: ['./services-experience.component.css'],
  providers: [DatePipe, UserService]
})
export class ServicesExperienceComponent implements OnInit {

  history: any[];
  idx: number;
  showAllComments: boolean;

  constructor(private datepipe: DatePipe, private usr_service : UserService) {
  }

  ngOnInit(): void {
    this.history = this.usr_service.services_history;
    this.idx=this.usr_service.idx;
    this.showAllComments = this.usr_service.showAllComments;
  }

  getAverageGrade() {
    let grades = 0;
    let sum = 0;
    this.history.forEach(elt => {
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

}
