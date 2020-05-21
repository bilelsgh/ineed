import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {ServiceService} from '../services/service.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './app-view.component.html',
  styleUrls: ['./app-view.component.css']
})
export class AppViewComponent implements OnInit {

  authStatus: boolean;
  annonceAccueil: number;
  annonceAccueil_type: string;

  annonces = [{user: "Test", date: "27/05", name: "Faire le ménage", image: "../assets/data/V1/menage.jpg"},
    {user: "Test", date: "15/08", name: "Faire la cuisine", image:"../assets/data/V1/cuisine.jpg"},
    {user: "Test", date: "8/09", name: "Accompagner", image: "../assets/data/V1/accompagner.jpg"}]; //à aller chercher dans la base de données
  constructor(private authService: AuthService, private serv: ServiceService, public router: Router) {}

  ngOnInit(){
    this.getLastAnnounce();
    //faire une fonctionpour sélectionner les dernières annonces dans la DB
  }

  getLastAnnounce(){
    this.serv.getLastAnnounces(1)
      .then(() => {
        console.log("success");
        console.table(this.serv.lastAnnounces["announces"]);
        this.annonceAccueil = this.serv.lastAnnounces["announces"][0];
        this.annonceAccueil_type = this.serv.lastAnnounces["announces"][0].content['type'];
      })
      .catch((e) => {
        console.log("Erreur lors de la récupération du dernier service ", e);
      });
  }

}
