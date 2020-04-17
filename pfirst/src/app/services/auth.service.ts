import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  backend = "https://rpicloud.ddns.net/";
  backend_test = "https://ineed-1ce51.firebaseio.com/";
  loggedInUserInfo : {};
  constructor(private http : HttpClient, private router : Router) { }


  public isAuthenticated() : Boolean {
    let userData = sessionStorage.getItem('token')
    if(userData && JSON.parse(userData)){
      return true;
    }
    return false;
  }

  public removeUserInfo(){
    sessionStorage.removeItem('token');
  }

  public setUserInfo(user){ //on met le token ici
    sessionStorage.setItem('token', JSON.stringify(user));
  }

  public validate(email, password) {
    return this.http.post(this.backend_test+"user_co.json", {"mail" : email, "password" : password}).toPromise();
  }
}
