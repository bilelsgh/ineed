import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/users.service";
import {FormBuilder, FormGroup, NgForm} from "@angular/forms";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {error} from "@angular/compiler/src/util";

@Component({
  selector: 'app-info-settings',
  templateUrl: './info-settings.component.html',
  styleUrls: ['./info-settings.component.css']
})
export class InfoSettingsComponent implements OnInit {

  small_password: boolean;
  strong_password: boolean;
  bad_password: boolean;
  medium_password: boolean;
  badRegex = new RegExp('^[a-z]{6,}$');
  mediumRegex = new RegExp('^[a-zA-Z0-9]{8,}$');
  strongRegex = new RegExp('^.{9,}$');
  same_password = true;

  changePassword: boolean = false;
  notSamePasswords: boolean = true;
  email: string;
  profil_pic: File;
  bio: string;
  phone: string;
  info_user: any;

  notifs: any = {
    profilPic: 'Veuillez entrer une nouvelle pdp'
  };

  userForm: FormGroup;

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private httpClient: HttpClient,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {

    this.userService.getProfilById('user').then(() => {
        //this.info_user = localStorage.getItem('user');   /!\ asynchrone
        this.info_user = this.userService.info_user;
        console.log('Init info-set : this.info_user : ', this.info_user);
        console.log(this.info_user["mail"]);
        this.email = this.info_user['mail'];
        console.log("this.email : ", this.email);
        console.table(this.email);
        this.bio = this.info_user['bio'];
        console.log(typeof (this.bio));
        this.profil_pic = this.info_user['profil_pic'];
        //this.userForm = this.initForm();
      }
    ).catch((e)=>{
      console.log('Init info-set : impossible de récupérer les infos users', e);
    });
  }

  // Recuperation de la photo selectionnee
  onFileSelected(event) {
    this.profil_pic = event.target.files[0] as File;
    console.log("PROFIL PIC :", this.profil_pic);
  }

  // Modification du mot de passe utilisateur
  onSubmitNewPassword(form: NgForm) {
    const formerMdp = form.value['formerPassword'];
    const newPassword = 'newP';
    console.log('modif mdp form.value', formerMdp);


    this.httpClient
      .post(this.authService.backend + 'api/user/login', {mail: JSON.parse(localStorage.getItem('user'))['mail'], password: formerMdp})
      .subscribe(
        (response) => {
          console.log("#Modif : mdp ancien correct: " + response);
          this.authService.setUserInfo(JSON.stringify(response['token']), 'token'); //stocke le token dans le session/localStorage
          this.authService.setUserInfo(JSON.stringify(response['user']), 'user');

          const httpOptions = {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization': response['token']
            })
          };

          console.log("token : ", typeof localStorage.getItem('token'));
          // nouveau mdp envoyé
          this.httpClient.put(this.authService.backend + 'api/user/' + this.info_user["idUser"] + "/password" ,{"password" : newPassword}, httpOptions)
            .subscribe(
              (response) => {
                console.log("#Modif : nouveau mdp accepté", response);
                this.authService.setUserInfo(response['token'],'token');
              },
              (error) => {
                console.log("#Modif : nouveau mdp refusé", response);
              }
        );
          this.router.navigate(['']);
        },
        (error) => {
          if (error['status'] === 401) {
            console.log("MDP Modif : erreur d'ancien mdp", error);
          }

        }
        );
  }

  onSubmitNewInfos(form: NgForm) {
    const form_value = form.value;
    const user = JSON.parse(localStorage.getItem('user'));
    user['bio'] = form_value['bio'];
    user['mail'] = form_value['email'];
    console.log("user : ", user);
  }


  quickCheckPassword(form: NgForm) {
    if (form.value.newPassword !== form.value.confirm_password) {
      this.same_password = false;
    } else {
      this.same_password = true;
    }
  }

  passwordComplexity(text: string) {

    if (text.length < 6) {
      this.small_password = true;
      this.bad_password = false;
      this.medium_password = false;
      this.strong_password = false;
      console.log("MOT DE PASSE TAILLE PETITE")
    } else if ( this.badRegex.test(text) ) {
      this.small_password = false;
      this.bad_password = true;
      this.medium_password = false;
      this.strong_password = false;

    } else if ( this.mediumRegex.test(text) ) {
      this.small_password = false;
      this.medium_password = true;
      this.strong_password = false;
      this.bad_password = false;
    } else if ( this.strongRegex.test(text) ) {
      this.small_password = false;
      this.strong_password = true;
      this.bad_password = false;
      this.medium_password = false;
    }

  }
}



