import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-view',
  templateUrl: './app-view.component.html',
  styleUrls: ['./app-view.component.css']
})
export class AppViewComponent implements OnInit {

  authStatus: boolean;

  annonces = [{helper: "Toto", helped: "Lulu", date: "27/05", service: "menage"},
    {helper: "Bilel", helped: "Raphael", date: "15/08", service: "cuisine"},
    {helper: "Lucie", helped: "Alain", date: "8/09", service: "accompagne"}]; //à aller chercher dans la base de données

  constructor(private authService: AuthService) {}

  ngOnInit(){
    //faire une fonctionpour sélectionner les dernières annonces dans la DB
  }


}
