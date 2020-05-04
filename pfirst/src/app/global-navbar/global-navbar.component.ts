import {Component, OnInit} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {ActivatedRoute, Router, UrlSegment} from '@angular/router';
import {Observable} from "rxjs";
import {switchMap} from "rxjs/operators";
import {UserService} from "../services/users.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ModalUserComponent} from "../modal-user/modal-user.component";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {transformAll} from "@angular/compiler/src/render3/r3_ast";

@Component({
  selector: 'app-global-navbar',
  templateUrl: './global-navbar.component.html',
  styleUrls: ['./global-navbar.component.css'],
  animations: [
    trigger('notifAppearance', [
      state('right', style({
        transform: 'scale(3)',
        position: 'absolute',
        top: '30px',
        left: '1400px'
      })),
      state('placed', style({
        transform: 'scale(1)'
      })),
      state('quartRotated', style({
        //transform: 'rotate(90deg)',
        position: 'absolute',
        top: '33px',
        left: '257px'
      })),
      state('semiRotated', style({
        //transform: 'rotate(180deg)',
        position: 'absolute',
        top: '63px',
        left: '227px'
      })),
      state('almostRotated', style({
        //transform: 'rotate(270deg)',
        position: 'absolute',
        top: '33px',
        left: '197px'
      })),
      state('rotated', style({
        //transform: 'rotate(360deg)',
        position: 'absolute',
        top: '3px',
        left: '227px'
      })),
      transition('rotated => placed', animate('100ms linear')),
      transition('quartRotated => semiRotated', animate('200ms linear')),
      transition('semiRotated => almostRotated', animate('200ms linear')),
      transition('almostRotated => rotated', animate('200ms linear')),
      transition('right => placed', animate('800ms ease-in')),
      transition('right => semiRotated', animate('800ms ease-in')),
      transition('placed => quartRotated', animate('100ms linear'))
    ])
  ]
})

export class GlobalNavbarComponent implements OnInit {

  quart = {
    position: 'absolute',
    top: '33px',
    left: '257px'
  };

  semi = {
    position: 'absolute',
    top: '63px',
    left: '225px'
  };

  almost = {
    position: 'absolute',
    top: '33px',
    left: '195px'
  };

  rotated = {
    position: 'absolute',
    top: '3px',
    left: '225px'
  };

  stateNotif: string = 'right';
  hasNotif: boolean = false;
  collapsed: boolean = false;
  route: Observable<UrlSegment[]>;
  path: UrlSegment[];
  hasUrl: boolean;
  showProfilMenu: boolean; // a sup si dropdown
  notifs: string[];

  constructor(public authService: AuthService, private actRoute: ActivatedRoute, router: Router, public userService: UserService, public matDialog: MatDialog) {
  }

  ngOnInit() {
    this.showProfilMenu = false;
    this.actRoute.url.subscribe(value => {
      this.path = value;
      console.log("oninit ext" + this.path);
    });
    setTimeout(() => {
      this.notifs = this.userService.notifications;
      this.hasNotif = this.notifs.length > 0;
    }, 1000);
    this.triggerNotifAppeareance(1000); //delay in ms
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

    console.log("oninit ext" + this.path);
    this.path = this.actRoute.snapshot.url;
    console.log("oninit fin ", this.path);
    const url: string = this.actRoute.snapshot.url.join('');
    console.log("url ", url);
  }

  triggerNotifAppeareance(delay: number) {
    setTimeout(() => {
      this.stateNotif = 'right';
    }, delay + 400);
    /*
    setTimeout(() => {
      this.stateNotif = 'placed';
    }, delay+800);
    setTimeout(() => {
      this.stateNotif = 'quartRotated';
    },delay+900);
     */
    setTimeout(() => {
      this.stateNotif = 'semiRotated';
    }, delay + 1100);
    /*
setTimeout(() => {
this.stateNotif = 'almostRotated';
}, delay+1300);
setTimeout(() => {
this.stateNotif = 'rotated';
}, delay+1500);
setTimeout(() => {
this.stateNotif = 'placed';
}, delay+1600);
*/

  }

  openUserModal() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.id = "modal-user-component";
    dialogConfig.width = "220px";
    dialogConfig.height = "auto";
    dialogConfig.position = {top: '95px', left: '140px'};
    dialogConfig.hasBackdrop = true;
    dialogConfig.backdropClass = "backdropClass";
    const modalDialog = this.matDialog.open(ModalUserComponent, dialogConfig);
  }
}
