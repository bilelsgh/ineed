import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/users.service";
import {FormBuilder, FormGroup, NgForm} from "@angular/forms";

@Component({
  selector: 'app-info-settings',
  templateUrl: './info-settings.component.html',
  styleUrls: ['./info-settings.component.css']
})
export class InfoSettingsComponent implements OnInit {

  email: string;
  profil_pic: File;
  bio: string;
  phone: string;
  info_user: any;

  userForm: FormGroup;

  constructor(private userService: UserService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.userService.getUserInfosFromToken().then(()=> {
        this.info_user = this.userService.info_user;
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

  initForm(){
    return this.formBuilder.group({
      email: this.email,
      bio: this.bio,
      profil_pic: this.profil_pic
    });
  }

  onSubmitNewInfos(form: NgForm) {
    const form_value = this.userForm.value;
    console.log("formValue : ", form_value);
  }

}


