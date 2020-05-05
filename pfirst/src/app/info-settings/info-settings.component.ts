import {Component, OnInit} from '@angular/core';
import {UserService} from "../services/users.service";
import {FormBuilder, FormGroup, NgForm} from "@angular/forms";
import {HttpClient} from "@angular/common/http";
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-info-settings',
  templateUrl: './info-settings.component.html',
  styleUrls: ['./info-settings.component.css']
})
export class InfoSettingsComponent implements OnInit {

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

    //probleme promesse
    this.userService.getProfilById('user').then(() => {
        this.info_user = localStorage.getItem('user');
        console.log("Init info-set : this.info_user : ", this.info_user);
        this.email = this.info_user['mail'];
        console.log("this.email : ", this.email);
        console.table(this.email);
        this.bio = this.info_user['bio'];
        console.log(typeof (this.bio));
        this.profil_pic = this.info_user['profil_pic'];
        //this.userForm = this.initForm();
      }
    );
  }

  onFileSelected(event) {
    this.profil_pic = event.target.files[0] as File;
    console.log("PROFIL PIC :", this.profil_pic);
  }

  initForm() {
    return this.formBuilder.group({
      email: this.email,
      bio: this.bio,
      profil_pic: this.profil_pic
    });
  }

  onSubmitNewPassword(form: NgForm) {
    const formerMdp = form.value['formerPassword'];
    const newPassword = 'newP';
    console.log('modif mdp form.value', formerMdp);
    /*
    this.httpClient
      .post(this.authService.backend + 'api/user/login', {mail: JSON.parse(localStorage.getItem('user'))['mail'], password: formerMdp})
      .subscribe(
        (response) => {
          console.log("#Modif : mdp ancien correct: " + response);
          this.authService.setUserInfo(JSON.stringify(response['token']), 'token'); //stocke le token dans le session/localStorage
          this.authService.setUserInfo(JSON.stringify(response['user']), 'user');
          //nouveau mdp envoyé
          this.httpClient.post(this.authService.backend + 'routemodifmdp', {password: newPassword})
            .subscribe(
              (response) => {
                console.log("#Modif : nouveau mdp accepté", response);
                //modifier user dans local storage + token
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
    */
  }

  onSubmitNewInfos(form: NgForm) {
    const form_value = form.value;
    const user = JSON.parse(localStorage.getItem('user'));
    user['bio'] = form_value['bio'];
    user['mail'] = form_value['email'];
    console.log("user : ", user);
  }

}


