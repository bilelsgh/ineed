import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import {InscriptionService} from '../services/inscription.service';
import {Router} from '@angular/router';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  same_password = true;

  constructor(private subService: InscriptionService, private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
  }



  onSubmit(form: NgForm){
    if (this.checkSamePassword(form)) {
      this.same_password = true;
      console.log("inscription ok");
      const name = form.value['name'];
      const prenom = form.value['prenom'];
      const sexe = form.value['sexe'];
      const mail = form.value['mail'];
      const password = form.value['password'];
      this.subService.addUser(name, prenom, sexe, mail, password);

      //this.auth.isAuth = true;
      this.router.navigate(['']);
    }else{
      form.reset();
      this.same_password = false;
      alert("Les mots de passe entrés ne sont pas identiques.");

    }
  }

  onSave(){
    this.subService.saveUsersToServers();
  }

  checkSamePassword(form: NgForm){
    return form.value['password'] === form.value['confirm_password'];
  }

}
