import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {NotificationService} from "../services/notification.service";
import {Notif} from "../models/notification.model";
import {MatSnackBarComponent} from '../mat-snack-bar/mat-snack-bar.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {


  constructor(public authService: AuthService,
              private router: Router,
              private httpClient: HttpClient,
              private notificationService: NotificationService,
              public snackBar: MatSnackBarComponent) {}

  field_non_valid : boolean = false;
  bad_mail_password : boolean = false;


  ngOnInit() {
    this.bad_mail_password = false;
  }

  onSignIn(mail: string, password: string) {
    /*Envoie du mail et mdp au backend et réception du token de l'user correspondant*/
    this.httpClient
      .post(this.authService.backend + 'api/user/login', {mail: mail, password: password})
      .subscribe(
        (response) => {
          console.log("#Connexion réussie :  " + response);

          this.authService.setUserInfo( JSON.stringify(response['token']), 'token'); //stocke le token dans le session/localStorage
          this.authService.setUserInfo( JSON.stringify(response['user']), 'user');
          this.notificationService.wakeWatcher(10000);
          this.snackBar.openSnackBar('Vous êtes connecté','', "blue-snackbar", 'top', 'center');
          this.router.navigate(['']);
        },
        (error) => {
          if (error['status'] === 401 || error['status'] === 400) {
            setTimeout(
              () => {
                this.bad_mail_password = true;
              }, 4000
            );
            this.bad_mail_password = false;
          }
        }
      );
  }

  onSubmit(form: NgForm) {
    if (this.testMail(form.value['mail'])){
      this.field_non_valid = false;
      this.onSignIn(form.value.mail, form.value.password); // PASSPORT
    }else{
      this.field_non_valid = true;
      form.reset();
    }

  }

  testMail(mail:string){
    for(let elt of mail){
      if(elt === '@'){
        return true;
      }
    }
    return false;
  }
}
