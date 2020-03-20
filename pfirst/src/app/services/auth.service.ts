import {NgForm} from '@angular/forms';
import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()

export class AuthService{

  constructor(private httpClient: HttpClient) {
  }

  isAuth = false;
  who: string;


  signIn(){

    return new Promise(
      (resolve,reject) => {
        setTimeout(
          () => {
            this.isAuth = true;
            resolve(true);

          }, 2000
        );
      }
    );
  }

  signOut(){
    this.isAuth = false;
  }


}
