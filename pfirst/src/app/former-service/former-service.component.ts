import {Component, Input, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';
import {UserService} from '../services/users.service';

@Component({
  selector: 'app-former-service',
  templateUrl: './former-service.component.html',
  styleUrls: ['./former-service.component.css'],
  providers: [DatePipe, UserService]
})
export class FormerServiceComponent implements OnInit {

  showComment: boolean;
  @Input() note : any;
  @Input() date : any;
  @Input() commentaire : string;

  constructor(private datepipe : DatePipe, private usr_serv: UserService) { }

  ngOnInit(): void {
    this.showComment=this.usr_serv.showAllComments;
  }

  getDescript() {
    let date = 'Date : ' + this.datepipe.transform(this.date, 'yyyy/MM/dd');
    let note = ' Note : ' + this.note;
    let comment = 'Commentaire : '+ this.commentaire;
    return [date,note,comment];
  }

  setComment(){
    this.showComment=true;
  }

  unsetComment(){
    this.showComment=false;
  }

}
