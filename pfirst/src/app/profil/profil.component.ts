import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/users.service';
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../services/auth.service";

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
              private route: ActivatedRoute,
              public router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe( (pars)=> {
      this.id = pars['id'];
      console.log('ID : ', this.id);
      this.userService.getProfilById(this.id).then(
        () => {
          this.info_user = this.userService.info_user;
          this.myProfil = (this.id == JSON.parse(localStorage.getItem('user')).idUser);
          console.log("myProfil : ", this.myProfil);
        })
        .catch( () => {
          console.log("#Erreur de chargement profil");
        });
    });
  }

  getPdpPath(): string{
    return this.authService.backend + '/static/images/' + this.info_user.photo;
  }

  //Récupération des services demandés

}
