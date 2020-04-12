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

  constructor(private userserv : UserService, public matDialogRef: MatDialogRef<ModalUserComponent>,
              private httpClient : HttpClient, private auth : AuthService, private router : Router){ }

  ngOnInit(): void {
  }

  closeUserModal(){
    this.matDialogRef.close();
  }

  myProfil(){
    this.httpClient
      .get<any[]>(this.auth.backend_test+'current_user.json')
      .subscribe(
        (response) => {

          this.userserv.info_user = response;
          console.log("#OK");
          console.log("#SERVICES : " + response);
        },
        (error) => {
          console.log("Erreur de chargement : " + error);
        }
      );
    this.router.navigate(['profil']);
  }
}
