import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/users.service';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  myProfil : boolean;
  info_user : any;
  id: string;

  constructor(private userService : UserService,
              private route: ActivatedRoute, public router: Router) {
  }

  ngOnInit(): void {
    this.route.params.subscribe( (pars)=> {
      this.id = pars['id'];
      this.userService.getProfilById(this.id).then(
        ()=> {
          this.info_user = this.userService.info_user;
          this.myProfil = (this.id === JSON.parse(localStorage.getItem('user')).idUser);
        })
        .catch( () => {
          console.log("#Erreur de chargement profil")
        });
    });
  }

  //Récupération des services demandés

}
