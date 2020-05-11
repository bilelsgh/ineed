import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/users.service";
import {FormBuilder, FormGroup, NgForm} from "@angular/forms";
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
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
  info_user: any = JSON.parse(localStorage.getItem('user'));

  notifs: any = {
    profilPic: 'Veuillez entrer une nouvelle pdp'
  };

  undefinedPic: string = "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";

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private httpClient: HttpClient,
              private authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {

    this.userService.getProfilById('user').then(() => {
        //this.info_user = localStorage.getItem('user');
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
    ).catch((e) => {
      console.log('Init info-set : impossible de récupérer les infos users', e);
    });
  }

  showStatus(){
    console.log("same_password :", this.same_password,"small_password :", this.small_password, "!same||small =", !this.same_password || this.small_password);
  }

  // Recuperation de la photo selectionnee
  onFileSelected(event) {
    this.profil_pic = event.target.files[0] as File;
    console.log("PROFIL PIC :", this.profil_pic);
  }

  // Modification du mot de passe utilisateur
  onSubmitNewPassword(form: NgForm) {
    const formerMdp = form.value['formerPassword'];
    const newPassword = form.value['newPassword'];
    console.log('modif mdp form.value', formerMdp);


    this.httpClient
      .post(this.authService.backend + 'api/user/login', {
        mail: JSON.parse(localStorage.getItem('user'))['mail'],
        password: formerMdp
      })
      .subscribe(
        (response) => {
          console.log("#Modif : mdp ancien correct: " + response);
          this.authService.setUserInfo(JSON.stringify(response['token']), 'token'); // stocke le token dans le session/localStorage
          this.authService.setUserInfo(JSON.stringify(response['user']), 'user');

          const myHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': response['token']
          });

          console.log("token : ", typeof localStorage.getItem('token'));

          // nouveau mdp envoyé
          this.httpClient.put(this.authService.backend + 'api/user/' + this.info_user["idUser"] + "/password",
            {"password": newPassword},
            {headers: myHeader, observe: 'response'})
            .subscribe(
              (resp) => {
                console.log("#Modif : nouveau mdp accepté, nouveau token = ", typeof resp.headers.get('Authorization'));
                this.authService.setUserInfo(JSON.stringify(resp.headers.get('Authorization')), 'token');
                form.reset();
              },
              (e) => {
                console.log("#Modif : nouveau mdp refusé", e);
              }
            );
          //this.router.navigate(['']);
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
    let user = JSON.parse(localStorage.getItem('user'));

    if (form_value['firstName'] != undefined && form_value['firstName'].length > 0 ){
      user['firstName'] = form_value['firstName'];
      console.log("#form value fname : ", form_value['firstName']);
    }

    if (form_value['lastName'] != undefined && form_value['lastName'].length > 0 ){
      user['lastName'] = form_value['lastName'];
      console.log("#form value lname : ", form_value['lastName']);
    }

    if (form_value['bio'] != undefined && form_value['bio'].length > 0 ){
      user['bio'] = form_value['bio'];
      console.log("#form value bio : ", form_value['bio']);
    }
    if (form_value['email'] != undefined && form_value['email'].includes('@')){
      user['mail'] = form_value['email'];
    }
    console.log("Sending user : ", user);
    console.log("Type of token ", typeof localStorage.getItem('token'), localStorage.getItem('token'));
    this.httpClient
      .put(this.authService.backend + 'api/user/' + user['idUser'], {
        "token": JSON.parse(localStorage.getItem('token')),
        "user": user
      })
      .subscribe(
        (response)=>{
          console.log("Nouvelles infos acceptées, new user :", response['user']);
          this.authService.setUserInfo(JSON.stringify(response['token']), 'token'); // stocke le token dans le session/localStorage
          this.authService.setUserInfo(JSON.stringify(response['user']), 'user');
          this.info_user = response['user'];
          form.reset();
        },
        (error1)=>{
          console.log("#Nouvelles infos refusées", error1);
        }
      );
  }

  onSubmitNewPicture(form: NgForm){
    this.httpClient.put(this.authService.backend + 'api/user/' + JSON.parse(localStorage.getItem('user'))['idUser'] + '/pdp', {
      "token": JSON.parse(localStorage.getItem('token')),
      "file": this.profil_pic
    })
      .subscribe(
      (response) => {
        console.log("Changement de pdp accepté, response =", response);
        this.authService.setUserInfo(JSON.stringify(response['user']), 'user');
        this.authService.setUserInfo(JSON.stringify(response['token']), 'token');
        this.info_user = response['user'];
      },
      (e) => {
        console.log("Changement de pdp refusé", e);
      }
    );
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
    } else if (this.badRegex.test(text)) {
      this.small_password = false;
      this.bad_password = true;
      this.medium_password = false;
      this.strong_password = false;

    } else if (this.mediumRegex.test(text)) {
      this.small_password = false;
      this.medium_password = true;
      this.strong_password = false;
      this.bad_password = false;
    } else if (this.strongRegex.test(text)) {
      this.small_password = false;
      this.strong_password = true;
      this.bad_password = false;
      this.medium_password = false;
    }

  }
}



