import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/users.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  bio : string;
  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.bio=this.userService.bio;
  }

  onSave(){
    this.userService.saveUserInfosToServer();
  }

  onLoad(){
    this.userService.getUserInfosFromServer();
  }

}
