import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  who : string;
  backend = "https://rpicloud.ddns.net/";
  backend_test = "https://ineed-1ce51.firebaseio.com/";
  loggedInUserInfo : {};
  constructor(private http : HttpClient, private router : Router) { }

  public isAuthenticated() : Boolean {
    let userData = localStorage.getItem('token')
    if(userData && JSON.parse(userData)){
      return true;
    }
    return false;
  }

  public removeUserInfo(){
    localStorage.removeItem('token');
  }

  public setUserInfo(user, where : string){ //on met le token ici
    localStorage.setItem(where, user);
  }

  public validate(email, password) {
    return this.http.post(this.backend_test+"user_co.json", {"mail" : email, "password" : password}).toPromise();
  }
}
