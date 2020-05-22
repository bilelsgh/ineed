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
  @Input() participants: any;
  @Input() pour: string;
  @Input() par: string;
  @Input() note: any;
  @Input() date: any;
  @Input() commentaire: string;
  @Input() announceId: number;
  @Input() imgSrc:string;
  forParticipants: any[];
  byParticipants: any[]

  constructor(public datepipe : DatePipe, private usr_serv: UserService) { }

  ngOnInit(): void {

    //this.showComment=this.usr_serv.showAllComments;
    /*
    this.img_paths = this.usr_serv.categ_to_icon;
    this.menage = (this.categorie === "menage");
    this.accompagnement = (this.categorie === "accompagnement");
    this.course = (this.categorie === "course");
    this.cuisine = this.categorie === "cuisine";
    // this.setBool();*/
  }

  getP(){
    this.forParticipants = this.usr_serv.getParticipants(this.announceId);
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
    return [date,note,comment];
  }

  setComment(){
    this.showComment=true;
  }

  unsetComment(){
    this.showComment=false;
  }

}
