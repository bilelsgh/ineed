import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {ActivatedRoute, Router, UrlSegment} from '@angular/router';
import {Observable} from "rxjs";
import {switchMap} from "rxjs/operators";
import {UserService} from "../services/users.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ModalUserComponent} from "../modal-user/modal-user.component";

@Component({
  selector: 'app-global-navbar',
  templateUrl: './global-navbar.component.html',
  styleUrls: ['./global-navbar.component.css']
})
export class GlobalNavbarComponent implements OnInit {

  collapsed: boolean = false;
  route: Observable<UrlSegment[]>;
  path: UrlSegment[];
  hasUrl: boolean;
  showProfilMenu: boolean; // a sup si dropdown
  notifs: string[];

  constructor(public authService: AuthService, private actRoute: ActivatedRoute, router: Router,public userService: UserService, public matDialog: MatDialog) {
  }

  ngOnInit() {
    this.showProfilMenu=false;
    this.notifs = this.userService.notifications;
    this.actRoute.url.subscribe(value => {
      this.path = value;
      console.log("oninit ext"+this.path);
    });

    /*
    this.route = this.actRoute.url.pipe(
      switchMap((params) => {
        this.path = url.get();
        this.hasUrl=params.has('url');
        console.log(this.hasUrl);
        return this.actRoute.url;
      })
    );
    */

    console.log("oninit ext"+this.path);
    this.path = this.actRoute.snapshot.url;
    console.log("oninit fin ", this.path);
    const url: string = this.actRoute.snapshot.url.join('');
    console.log("url ",url);
  }

  openUserModal(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = "modal-user-component";
    dialogConfig.width = "180px";
    dialogConfig.height = "auto";
    dialogConfig.position = {top: '95px', left:'140px'};
    dialogConfig.hasBackdrop = true;
    dialogConfig.backdropClass = "backdropClass";
    const modalDialog = this.matDialog.open(ModalUserComponent, dialogConfig);
  }
}
