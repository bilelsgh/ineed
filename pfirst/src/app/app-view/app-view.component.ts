import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-view',
  templateUrl: './app-view.component.html',
  styleUrls: ['./app-view.component.css']
})
export class AppViewComponent implements OnInit {

  authStatus: boolean;
  annonces = [{helper: "Toto", helped: "Lulu", date: "27/05"}, {helper: "Bibel", helped: "Katan", date: "15/08"}]; //à aller chercher dans la base de données

  constructor(private authService: AuthService) {}

  ngOnInit(){
  }



}
