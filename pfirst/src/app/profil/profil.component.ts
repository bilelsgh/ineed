import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/users.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  bio : string;
  lname: string;
  fname: string;
  average_grade: number;

  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.bio=this.userService.bio;
    this.fname = this.userService.fname;
    this.lname = this.userService.lname;
    this.average_grade = this.userService.average_grade;
  }

  onSave(){
    this.userService.saveUserInfosToServer();
  }

  onLoad(){
    this.userService.getUserInfosFromServer();
  }

}
