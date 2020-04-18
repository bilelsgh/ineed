import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {UserService} from '../services/users.service';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.css']
})
export class ModalUserComponent implements OnInit {

  constructor(private userserv: UserService, public matDialogRef: MatDialogRef<ModalUserComponent>,
              private httpClient: HttpClient, private auth: AuthService, private router: Router){}

  ngOnInit(): void {
  }

  goThenClose(where: string){
    this.router.navigate([where]);
    this.matDialogRef.close();
  }

  myProfil(){
    this.auth.setUserInfo( localStorage.getItem('token') ,'current_profil');
    this.router.navigate(['profil']);
    this.matDialogRef.close();
  }

}
