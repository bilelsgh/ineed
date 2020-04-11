import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/users.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  info_user = [];

  constructor(private userService : UserService) { }

  ngOnInit(): void {
    this.info_user = this.userService.info_user;
  }

  onSave(){
    this.userService.saveUserInfosToServer();
  }

  onLoad(){
    this.userService.getUserInfosFromServer();
  }

}
