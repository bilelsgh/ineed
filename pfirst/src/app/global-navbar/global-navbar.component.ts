import {Component, OnInit, OnDestroy} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {ActivatedRoute, Router, UrlSegment} from '@angular/router';
import {Observable, Subscription} from "rxjs";
import {switchMap} from "rxjs/operators";
import {UserService} from "../services/users.service";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {ModalUserComponent} from "../modal-user/modal-user.component";
import {animate, state, style, transition, trigger} from "@angular/animations";
import {transformAll} from "@angular/compiler/src/render3/r3_ast";
import {NotificationService} from "../services/notification.service";
import {Notif} from "../models/notification.model";
import {ImageCompressorService} from "../services/image-compressor.service";

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
      state('38Rotated', style({
        //transform: 'rotate(90deg)',
        position: 'absolute',
        top: '48px',
        left: '242px'
      })),
      state('semiRotated', style({
        //transform: 'rotate(180deg)',
        position: 'absolute',
        top: '63px',
        left: '227px'
      })),
      state('58Rotated', style({
        //transform: 'rotate(90deg)',
        position: 'absolute',
        top: '48px',
        left: '212px'
      })),
      state('almostRotated', style({
        //transform: 'rotate(270deg)',
        position: 'absolute',
        top: '33px',
        left: '197px'
      })),
      state('78Rotated', style({
        //transform: 'rotate(90deg)',
        position: 'absolute',
        top: '18px',
        left: '212px'
      })),
      state('rotated', style({
        //transform: 'rotate(360deg)',
        position: 'absolute',
        top: '3px',
        left: '227px'
      })),
      transition('placed => rotated', animate('100ms linear')),
      transition('rotated => 78Rotated', animate('100ms linear')),
      transition('78Rotated => almostRotated', animate('100ms linear')),
      transition('almostRotated => 58Rotated', animate('100ms linear')),
      transition('58Rotated => semiRotated', animate('100ms linear')),
      transition('semiRotated => 38Rotated', animate('100ms linear')),
      transition('38Rotated => quartRotated', animate('100ms linear')),
      transition('quartRotated => placed', animate('100ms linear')),


      transition('rotated => placed', animate('100ms linear')),
      transition('quartRotated => 38Rotated', animate('100ms linear')),
      transition('38Rotated => semiRotated', animate('100ms linear')),
      transition('semiRotated => almostRotated', animate('200ms linear')),
      transition('almostRotated => rotated', animate('200ms linear')),
      transition('right => placed', animate('800ms ease-in')),
      transition('right => semiRotated', animate('800ms ease-in')),
      transition('placed => quartRotated', animate('100ms linear'))
    ]),
    trigger('translation',[
      state('toRight',style({
        transform: 'translateX(100px)'
      })),
      state('toLeft', style({
        transform: 'translateX(-100px)'
      })),
      transition('toRight => toRight', animate('800ms linear')),
      transition('toRight => toLeft', animate('800ms linear')),
      transition('toLeft => toRight', animate('800ms linear'))
    ])
  ]
})

export class GlobalNavbarComponent implements OnInit, OnDestroy{

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

  stateTranslate: string = 'toRight';

  stateNotif: string = 'right';
  hasNotif: boolean = false;
  notifList: Notif[];
  notifSubscription: Subscription;

  collapsed: boolean = false;
  route: Observable<UrlSegment[]>;
  path: UrlSegment[];
  hasUrl: boolean;
  showProfilMenu: boolean; // a sup si dropdown

  constructor(public authService: AuthService,
              private actRoute: ActivatedRoute,
              router: Router,
              public userService: UserService,
              public matDialog: MatDialog,
              private notificationService: NotificationService,
              private compressorService: ImageCompressorService) {
  }

  ngOnInit() {
    //this.undefinedURL = this.compressorService.undefinedPicCompressedURL;
    this.showProfilMenu = false;
    this.actRoute.url.subscribe(value => {
      this.path = value;
      console.log("oninit ext" + this.path);
    });
    this.notifList = this.notificationService.notifList;
    this.hasNotif = this.notifList.length > 0; // to see later
    this.notifSubscription = this.notificationService.notifSubject
      .subscribe(
        (list) => {
          this.notifList = list;
          this.hasNotif = this.notifList.length > 0;
        }
      );

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

  ngOnDestroy() {
    this.notifSubscription.unsubscribe();
  }
  getPdpName(): string {
    return JSON.parse(localStorage.getItem('user')).photo;
  }

  triggerNotifAppeareance(delay: number) {
    setTimeout(() => {
      this.stateNotif = 'right';
    }, delay + 400);

    setTimeout(() => {
      this.stateNotif = 'placed';
    }, delay+800);
    /*
    setTimeout(() => {
      this.stateNotif = 'quartRotated';
    },delay+900);

    setTimeout(() => {
      this.stateNotif = 'semiRotated';
    }, delay + 1100);
     */
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

  stopWatcher(){
    this.notificationService.sleepWatcher();
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
