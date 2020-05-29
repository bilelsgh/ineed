import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/users.service";
import {FormBuilder, FormGroup, NgForm} from "@angular/forms";
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from "@angular/common/http";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";
import {error} from "@angular/compiler/src/util";
import {Observable} from "rxjs";
import {NgxImageCompressService} from "ngx-image-compress";
import {ImageCompressorService} from "../services/image-compressor.service";
import {NotificationService} from "../services/notification.service";
import {Notif, NotifContext} from "../models/notification.model";

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
  badRegex = new RegExp('^[a-zA-Z]{8,}$');
  mediumRegex = new RegExp('^[a-zA-Z0-9]{8,}$');
  strongRegex = new RegExp('^.{8,}$');
  same_password: boolean = true;

  changePassword: boolean = false;
  notSamePasswords: boolean = true;
  //email: string;
  profil_pic: File;
  bio: string;
  phone: string;
  info_user: any = JSON.parse(localStorage.getItem('user'));


  undefinedPicURL: string;

  constructor(private userService: UserService,
              private formBuilder: FormBuilder,
              private httpClient: HttpClient,
              private authService: AuthService,
              private router: Router,
              private imageCompress: NgxImageCompressService,
              private compressorService: ImageCompressorService,
              private notificationService: NotificationService) {
  }

  ngOnInit(): void {
    this.undefinedPicURL = this.compressorService.undefinedPicCompressedURL;

    this.userService.getProfilById(JSON.parse(localStorage.getItem('user')).idUser).then(() => {
        //this.info_user = localStorage.getItem('user');
        this.info_user = this.userService.info_user;
        this.bio = this.info_user['bio'];
        this.profil_pic = this.info_user['profil_pic'];
        //this.userForm = this.initForm();
      }
    ).catch((e) => {
    });
  }

  //-------------------------------------------------
  // Recuperation de la photo selectionnee
  onFileSelected(event) {
    this.profil_pic = event.target.files[0] as File;
  }

  // Modification du mot de passe utilisateur
  onSubmitNewPassword(form: NgForm) {
    const formerMdp = form.value['formerPassword'];
    const newPassword = form.value['newPassword'];
    //console.log('modif mdp form.value', formerMdp);

    this.httpClient
      .post(this.authService.backend + 'api/user/login', {
        mail: JSON.parse(localStorage.getItem('user'))['mail'],
        password: formerMdp
      })
      .subscribe(
        (response) => {
          //console.log("#Modif : mdp ancien correct: " + response);
          this.authService.setUserInfo(JSON.stringify(response['token']), 'token'); // stocke le token dans le session/localStorage
          this.authService.setUserInfo(JSON.stringify(response['user']), 'user');

          const myHeader = new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': response['token']
          });

          //console.log("token : ", typeof localStorage.getItem('token'));

          // nouveau mdp envoyé
          this.httpClient.put(this.authService.backend + 'api/user/' + this.info_user["idUser"] + "/password",
            {"password": newPassword},
            {headers: myHeader, observe: 'response'})
            .subscribe(
              (resp) => {
                //console.log("#Modif : nouveau mdp accepté, nouveau token = ", typeof resp.headers.get('Authorization'));
                this.authService.setUserInfo(JSON.stringify(resp.headers.get('Authorization')), 'token');
                form.reset();
              },
              (e) => {
                //console.log("#Modif : nouveau mdp refusé", e);
              }
            );
          //this.router.navigate(['']);
        },
        (error) => {
          if (error['status'] === 401) {
            //console.log("MDP Modif : erreur d'ancien mdp", error);
          }

        }
      );
  }

  onSubmitNewInfos(form: NgForm) {
    const form_value = form.value;
    let user = JSON.parse(localStorage.getItem('user'));

    if (form_value['firstName'] != undefined && form_value['firstName'].length > 0) {
      user['firstName'] = form_value['firstName'];
      //console.log("#form value fname : ", form_value['firstName']);
    }

    if (form_value['lastName'] != undefined && form_value['lastName'].length > 0) {
      user['lastName'] = form_value['lastName'];
      //console.log("#form value lname : ", form_value['lastName']);
    }

    if (form_value['bio'] != undefined && form_value['bio'].length > 0) {
      user['bio'] = form_value['bio'];
      //console.log("#form value bio : ", form_value['bio']);
    }
    /* pas possible de modifier email finalement
    if (form_value['email'] != undefined && form_value['email'].includes('@')){
      user['mail'] = form_value['email'];
    }
     */
    //console.log("Sending user : ", user);
    //console.log("Token before sending new infos ", JSON.parse(localStorage.getItem('token')));
    this.httpClient
      .put(this.authService.backend + 'api/user/' + user['idUser'], {
        "token": JSON.parse(localStorage.getItem('token')),
        "user": user
      })
      .subscribe(
        (response) => {
          this.authService.setUserInfo(JSON.stringify(response['token']), 'token'); // stocke le token dans le session/localStorage
          if (form_value['bio'] != undefined && form_value['bio'].length > 0) {
            const bioUpdater = this.notificationService.buildUpdater(
              new Notif('Complétez votre profil avec une courte bio !', 'warning', '', 'infos'),
              new NotifContext('bioUpload'),
              JSON.parse(localStorage.getItem('user')).idUser);
            this.notificationService.updateToTreated(bioUpdater);
          }
          //console.log("Nouvelles infos acceptées, new user :", response['user']);
          //localStorage.setItem('token', JSON.stringify(response['token']));
          this.authService.setUserInfo(JSON.stringify(response['user']), 'user');
          this.info_user = response['user'];
          //console.log("Token recu apres info :", response['token']);
          //setTimeout( ()=>{this.onSubmitNewPicture(form, response['token'])}, 5000);

          if (this.profil_pic != undefined) {
            this.onSubmitNewPicture(form).then(() => {
                const pdpUpdater = this.notificationService.buildUpdater(
                  new Notif('Chargez votre première photo de profil !', 'warning', '', 'infos'),
                  new NotifContext('pdpUpload'),
                  JSON.parse(localStorage.getItem('user')).idUser);
                this.notificationService.updateToTreated(pdpUpdater);
                form.reset();
              }
            ).catch(() => {
              //console.log("Impossible d'envoyer la photo");
            });
          } else {
            form.reset();
          }
        },
        (error1) => {
          //console.log("#Nouvelles infos refusées", error1);
        }
      );
  }

  onSubmitNewPicture(form: NgForm) {

    return new Promise((resolve, reject) => {
      const params = new HttpParams().set('token', JSON.parse(localStorage.getItem('token')));

      let fileData: FormData = new FormData();
      /* a voir si on compresse plus tard
      let compressed: any;
      this.compressorService.compressFile(this.profil_pic).then(
        ()=> {
          compressed = this.compressorService.servCompressedURl;
        });
       */
      fileData.append('file', this.profil_pic);

      this.httpClient.post(this.authService.backend + 'api/user/' + JSON.parse(localStorage.getItem('user'))['idUser'] + '/photo',
        fileData,
        {params})
        .subscribe(
          (response) => {
            //console.log("Changement de pdp accepté, response =", response);
            this.authService.setUserInfo(JSON.stringify(response['user']), 'user');
            this.authService.setUserInfo(JSON.stringify(response['token']), 'token');
            this.info_user = response['user'];
            resolve(true);
          },
          (e) => {
            //console.log("Changement de pdp refusé", e);
            reject(true);
          }
        );
    });
  }

  quickCheckPassword(form: NgForm) {
    if (form.value.newPassword !== form.value.confirm_password) {
      this.same_password = false;
    } else {
      this.same_password = true;
    }
  }

  getPdpName(): string {
    return JSON.parse(localStorage.getItem('user')).photo;
  }

  passwordComplexity(text: string) {
    //console.log('#PASSWORD COMPLEXITY, former_sp =', this.small_password, "text =", text, 'text.length < 6 = ', text.length < 6);
    if (text.length < 8) {
      this.small_password = true;
      this.bad_password = false;
      this.medium_password = false;
      this.strong_password = false;
      //console.log("MOT DE PASSE TAILLE PETITE")
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
    } else {
      this.small_password = false;
    }
    //console.log('new_sp =', this.small_password);
  }

  file: any;
  profilPicURL: any;

  /* tests de compression & encodage
  selectFile(event: any) {
    let loadedUrl: any;
    this.file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        loadedUrl = event.target.result;
        //this.compressFile(this.localUrl, fileName);
        this.compressorService.compressFile(loadedUrl).then(
          (myStatus) => {
            //console.log('Compression status :', myStatus);
            this.profilPicURL = this.compressorService.servCompressedURl;
            //console.log(this.profilPicURL);
          }
        );
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
   */
}



