import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {ServiceService} from '../services/service.service';

@Component({
  selector: 'app-view',
  templateUrl: './app-view.component.html',
  styleUrls: ['./app-view.component.css']
})
export class AppViewComponent implements OnInit {

  authStatus: boolean;

  annonces = [{user: "Test", date: "27/05", name: "Faire le ménage", image: "../assets/data/V1/menage.jpg"},
    {user: "Test", date: "15/08", name: "Faire la cuisine", image:"../assets/data/V1/cuisine.jpg"},
    {user: "Test", date: "8/09", name: "Accompagner", image: "../assets/data/V1/accompagner.jpg"}]; //à aller chercher dans la base de données
  disconnected_message : boolean;
  constructor(private authService: AuthService, private serv: ServiceService) {}

  ngOnInit(){
    if(this.authService.disconnected_message){
      this.disconnected_message = true;
      setTimeout(
        () => {
          this.disconnected_message = false;},3000);
    }
    //faire une fonctionpour sélectionner les dernières annonces dans la DB
  }


}
