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
    this.id = this.route.snapshot.params['id'];
    this.userService.getProfilById(this.id).then( ()=>{
      this.info_user = this.userService.info_user;
      console.table('#infouser : ', this.info_user);
      }
    )
      .catch( ()=>{
        console.log("Erreur de recupération des infos profil");
      });

  }

  onSave(){
    this.userService.saveUserInfosToServer();
  }

  onLoad(){
    this.userService.getUserInfosFromServer();
  }

}
