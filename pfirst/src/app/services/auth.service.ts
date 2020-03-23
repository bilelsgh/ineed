import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  loggedInUserInfo : {};
  constructor(private http : HttpClient, private router : Router) { }


  public isAuthenticated() : Boolean {
    let userData = localStorage.getItem('userInfo')
    if(userData && JSON.parse(userData)){
      return true;
    }
    return false;
  }

  public removeUserInfo(){
    localStorage.removeItem('userInfo');
  }

  public setUserInfo(user){
    localStorage.setItem('userInfo', JSON.stringify(user));
  }

  public validate(email, password) {
    return this.http.post('https://ineed-1ce51.firebaseio.com/users.json', {'username' : email, 'password' : password}).toPromise()
  }
}
