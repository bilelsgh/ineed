import {OnDestroy, OnInit } from '@angular/core';
import {NotificationService} from "./services/notification.service";
import {Notif, NotifContext} from "./models/notification.model";
import {AfterViewInit, Component, ElementRef} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {UserService} from './services/users.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit, AfterViewInit, OnDestroy{
  dark_theme : boolean;
  light_theme : boolean;
  light_theme_sub : Subscription;
  dark_theme_sub : Subscription;
  title = 'INEED';
  myTheme : string ;
  //notifSubscription: Subscription;
  //notifList: Notif[];

  constructor(private userServ : UserService,
              private elementRef: ElementRef,
              public notificationService: NotificationService) {
  }

  ngOnInit(){
    this.setTheme();
    /*
    this.notifList = this.notificationService.notifList;
    this.notifSubscription = this.notificationService.notifSubject.subscribe(
      (notifs) => {
        this.notifList = this.notificationService.notifList;
        ////console.log(this.notifList);
      }
    );*/
  }

  ngAfterViewInit() {
    this.dark_theme_sub = this.userServ.darkThemeSubject.subscribe(
      (response: boolean) => {
        this.dark_theme = response;

        this.light_theme_sub = this.userServ.lightThemeSubject.subscribe(
          (response_bis: boolean) => {
            this.light_theme = response_bis;
          }
        );
        this.dark_theme == true ? this.myTheme = 'theme-dark' : this.myTheme = 'theme-light';
        if(this.dark_theme && !this.light_theme){
          this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#2e2e2e';
        }else if(!this.dark_theme && this.light_theme){
          this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'whitesmoke';
        }

        this.userServ.emitLightThemeSubject();


      }
    );
    this.userServ.emitDarkThemeSubject();
  }

  ngOnDestroy() {
    //this.notifSubscription.unsubscribe();
  }

  setTheme() {

    //Récupération de l'information permettant d'appliquer une theme sombre ou clair
    this.dark_theme_sub = this.userServ.darkThemeSubject.subscribe(
      (response: boolean) => {
        this.dark_theme = response;

        this.light_theme_sub = this.userServ.lightThemeSubject.subscribe(
          (response_bis: boolean) => {
            this.light_theme = response_bis;
          }
        );
        this.dark_theme == true ? this.myTheme = 'theme-dark' : this.myTheme = 'theme-light';
        this.userServ.emitLightThemeSubject();


      }
    );
    this.userServ.emitDarkThemeSubject();
  }
}
