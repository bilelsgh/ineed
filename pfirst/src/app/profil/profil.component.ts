import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/users.service';
import {ComponentPortal} from "@angular/cdk/portal";
import {Overlay} from "@angular/cdk/overlay";
import {catchError} from "rxjs/operators";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  info_user : any;
  id: string;

  constructor(private userService : UserService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.info_user = JSON.parse(localStorage.getItem('token'))["user"] ;
    console.table(this.info_user);
  }

  onSave(){
    this.userService.saveUserInfosToServer();
  }

  onLoad(){
    this.userService.getUserInfosFromServer();
  }

}
