import {AfterViewInit, Component, ElementRef, OnInit} from '@angular/core';
import {AuthService} from "./services/auth.service";
import {UserService} from './services/users.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit{
  dark_theme : boolean;
  light_theme : boolean;
  light_theme_sub : Subscription;
  dark_theme_sub : Subscription;
  title = 'INEED';

  constructor(private userServ : UserService, private elementRef: ElementRef) {
  }

  ngOnInit(){
    this.setTheme();
  }

  ngAfterViewInit() {
    this.setTheme();
    if(this.dark_theme && !this.light_theme){
      this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#2e2e2e';
    }else if(!this.dark_theme && this.light_theme){
      this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = 'whitesmoke';
    }
  }


  setTheme(){

    //Récupération de l'information permettant d'appliquer une theme sombre ou clair
    this.dark_theme_sub = this.userServ.darkThemeSubject.subscribe(
      (response: boolean) => {
        this.dark_theme = response;

        this.light_theme_sub = this.userServ.lightThemeSubject.subscribe(
          (response_bis: boolean) => {
            this.light_theme = response_bis;
          }
        );
        console.log('ok dark = ' + this.dark_theme + 'light = ' + this.light_theme);
        this.userServ.emitLightThemeSubject();


      }
    );
    this.userServ.emitDarkThemeSubject();

  }
}

