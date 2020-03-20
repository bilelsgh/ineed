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

  constructor(private subService: InscriptionService, private router: Router, private auth: AuthService) { }

  ngOnInit(): void {
  }



  onSubmit(form: NgForm){
    console.log("ok");
    const name = form.value['name'];
    const prenom = form.value['prenom'];
    const sexe = form.value['sexe'];
    const mail = form.value['mail'];
    const password = form.value['password'];
    this.subService.addUser(name,prenom,sexe,mail,password);

    //this.auth.isAuth = true;
    this.router.navigate(['']);

  }

  onSave(){
    this.subService.saveUsersToServers();
  }
}
