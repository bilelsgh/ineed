import { Component, OnInit } from '@angular/core';
import {AuthService} from "../services/auth.service";
import {ActivatedRoute, Router, UrlSegment} from '@angular/router';
import {Observable} from "rxjs";
import {switchMap} from "rxjs/operators";
import {UserService} from "../services/users.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ModalUserComponent} from "../modal-user/modal-user.component";
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-global-navbar',
  templateUrl: './global-navbar.component.html',
  styleUrls: ['./global-navbar.component.css'],
  animations: [
    trigger('reduceNotif', [
      state('inactive', style({
        transform: 'scale(15)',
        position: 'absolute',
        top: '40%',
        left: '30%'
      })),
      state('active', style({
        transform: 'scale(1)'
      })),
      transition('inactive => active', animate('800ms ease-in')),
    ]),
    ]
})
export class GlobalNavbarComponent implements OnInit {

  stateNotif: string = 'inactive';
  hasNotif: boolean = false;
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
    this.actRoute.url.subscribe(value => {
      this.path = value;
      console.log("oninit ext"+this.path);
    });
    setTimeout(()=>{
      this.notifs = this.userService.notifications;
      this.hasNotif = this.notifs.length>0;
    },1000);
    setTimeout(()=>{
      this.stateNotif = 'active';
    },1000);

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
    dialogConfig.width = "220px";
    dialogConfig.height = "auto";
    dialogConfig.position = {top: '95px', left:'140px'};
    dialogConfig.hasBackdrop = true;
    dialogConfig.backdropClass = "backdropClass";
    const modalDialog = this.matDialog.open(ModalUserComponent, dialogConfig);
  }
}
