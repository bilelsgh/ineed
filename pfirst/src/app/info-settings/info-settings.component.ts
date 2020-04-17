import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/users.service";
import {FormBuilder, FormGroup} from "@angular/forms";

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
    this.info_user = JSON.parse(sessionStorage.getItem('token'))["user"];
    this.email = this.info_user['email'];
    this.bio = this.info_user['bio'];
    this.profil_pic = this.info_user['profil_pic'];
    this.initForm();
  }

  initForm(){
    this.userForm=this.formBuilder.group({
      email: this.email,
      bio: this.bio,
      profil_pic: this.profil_pic
    });
  }

  onSubmitNewInfos() {
    const form_value = this.userForm.value;
    console.log("formValue : ", form_value);
  }
}


