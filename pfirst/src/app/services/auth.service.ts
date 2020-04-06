import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  backend = "https://ineed-1ce51.firebaseio.com/";
  loggedInUserInfo : {};
  constructor(private http : HttpClient, private router : Router) { }


  public isAuthenticated() : Boolean {
    let userData = sessionStorage.getItem('userInfo')
    if(userData && JSON.parse(userData)){
      return true;
    }
    return false;
  }

  public removeUserInfo(){
    sessionStorage.removeItem('userInfo');
  }

  public setUserInfo(user){
    sessionStorage.setItem('userInfo', JSON.stringify(user));
  }

  public validate(email, password) {
    return this.http.post(this.backend+"users.json", {'username' : email, 'password' : password}).toPromise()
  }
}
