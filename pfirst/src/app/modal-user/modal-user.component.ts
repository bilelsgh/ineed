import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import {UserService} from '../services/users.service';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';
import {animate, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.css'],
  animations: [
    trigger('reduce', [
      state('inactive', style({
        transform: 'scale(5)'
      })),
      state('active', style({
        transform: 'scale(1)'
      })),
      transition('inactive => active', animate('800ms ease-in')),
    ]),
    trigger('extend', [
      state('inactive', style({
        width: '140px'
      })),
      state('active', style({
        width: '150px'
      })),
      transition('inactive => active', animate('800ms')),
  ]),
],
})
export class ModalUserComponent implements OnInit {
  stateExtend: string = 'inactive';
  stateReduce: string = 'inactive';

  hasInfoNotif: boolean = false;
  hasProfilNotif: boolean = false;
  hasActivityNotif: boolean = false;

  constructor(private userserv: UserService, public matDialogRef: MatDialogRef<ModalUserComponent>,
              private httpClient: HttpClient, private auth: AuthService, private router: Router){}

  ngOnInit(): void {
    setTimeout( ()=>{
      //this.hasInfoNotif = true;
      this.hasProfilNotif = true;
      //this.hasActivityNotif = true;
    }, 500);

    setTimeout( ()=>{
      this.stateReduce = 'active';
      this.stateExtend = 'active';
    },500);

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
