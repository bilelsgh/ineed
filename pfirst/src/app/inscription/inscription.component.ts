import { Component, OnInit } from '@angular/core';
import {NgForm, NgModel} from '@angular/forms';
import {InscriptionService} from '../services/inscription.service';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})

export class InscriptionComponent implements OnInit {

  alreadyExist : boolean = false;
  current_surname: string;
  picture_profil_file: File = null;
  small_password: boolean;
  strong_password: boolean;
  bad_password: boolean;
  medium_password: boolean;
  badRegex = new RegExp('^[a-z]{6,}$');
  mediumRegex = new RegExp('^[a-zA-Z0-9]{8,}$');
  strongRegex = new RegExp('^.{9,}$');
  same_password = true;
  info_mdp = false;


  constructor(public subService: InscriptionService, private router: Router, private auth: AuthService,
              private httpClient: HttpClient) {
  }

  ngOnInit(): void {
  }


  onSubmit(form: NgForm) {
    if (this.checkSamePassword(form)) {
      this.same_password = true;
      console.log('inscription valide.');
      const name = form.value.lastName;
      const prenom = form.value.firstName;
      const sexe = form.value.sex;
      const mail = form.value.mail;
      const password = form.value.password;
      this.addUser(name, prenom, sexe, mail, password);


      // this.auth.isAuth = true;
    } else if (form.value.password.length < 6) {
      form.reset();
      this.strong_password = false;
      this.medium_password = false;
      this.bad_password = false;
      this.same_password = true;
      alert('Le mot de passe doit faire au moins 6 caractères.');
    } else {
      form.reset();
      this.strong_password = false;
      this.medium_password = false;
      this.bad_password = false;
      this.same_password = true;
      alert('Les mots de passe entrés ne sont pas identiques.');

    }
  }

 /** onSave() {
    this.subService.saveUsersToServers(); méthode saveUsersToServers() n'existe plus et est dans addUSer
  } **/

  checkSamePassword(form: NgForm) {
    return form.value.password === form.value.confirm_password;
  }
  quickCheckPassword(form: NgForm) {
    if (form.value.password !== form.value.confirm_password) {
      this.same_password = false;
    } else {
      this.same_password = true;
    }
  }

  passwordComplexity(text: string) {

    if (text.length < 6) {
      this.small_password = true;
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

  addUser(nom: string, prenom: string, sexe: string, mail: string, password: string, ){
    const newUser = {firstName: '', lastName: '', sex: '', mail:'', password:''};
    newUser.firstName = prenom;
    newUser.lastName = nom;
    newUser.sex = sexe;
    newUser.mail = mail;
    newUser.password = password;
    //this.users.push(newUser);
    console.log(newUser + "#");

    this.httpClient
      .post(this.auth.backend + 'api/user', newUser)
      .subscribe(
        (response) => {
          //RÉCEPTION DU TOKEN PAR LE BACKEND ET LE METTRE DANS LOCAL
          console.log("#Inscription réussie : " + response);
          this.alreadyExist = false;
          this.auth.setUserInfo( JSON.stringify(response['token']), 'token'); //stocke le token dans le session/localStorage
          this.auth.setUserInfo( JSON.stringify(response['user']), 'user');
          this.router.navigate(['']);

        },
        (error) => {
          if(error['status'] === 400){
            this.alreadyExist = true;
          }
          console.log('Erreur lors de linscription: ' + error);
        }
      );
  }

  onFileSelected(event) {
    this.picture_profil_file = event.target.files[0] as File
    console.log("PROFIL PIC :", this.picture_profil_file);
  }

  onUpload() {
    const fd = new FormData();
    fd.append('image', this.picture_profil_file, this.picture_profil_file.name);
    this.httpClient.post('gs://ineed-1ce51.appspot.com/', fd)
      .subscribe(res => {
        console.log(res);
      });
  }

  updateSurname(text: string) {
    this.current_surname = text;
  }

  displayInfo(){
    this.info_mdp = true;
    return new Promise(
      (resolve,reject)=>{
        setTimeout(()=>{
            this.info_mdp=false;
            resolve(true);
          },5000
        );
      }
    );
  }
}
