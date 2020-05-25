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

  public rank : string;
  myProfil : boolean;
  info_user : any;
  id: string;
  services_history_for: any[] = new Array();
  services_history_by: any[] = new Array();

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              public router: Router,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.route.params.subscribe( (pars) => {
      this.id = pars['id'];
      console.log('ID : ', this.id);
      this.userService.getProfilById(this.id).then(
        () => {
          this.info_user = this.userService.info_user;
          this.myProfil = (this.id == JSON.parse(localStorage.getItem('user')).idUser);
          console.log('myProfil : ', this.myProfil);
        })
        .catch( () => {
          console.log('#Erreur de chargement profil');
        });
      this.userService.getUserHistory(this.id)
        .then( () => {
          this.services_history_by = this.userService.services_history_by;
          this.services_history_for = this.userService.services_history_for;
          this.userService.setDicoAnnounceIds();
          this.getRank();
          this.userService.getReviews(+this.id).then( () => {
            this.userService.associateReviewToAuthorAndAnnounce();
          }).catch( (e) => {
            console.log(e);
          });
        })
        .catch( (e) => {
          console.log('Erreur de récupération de l\'historique dans profil',e);
        });
    });
  }

  getPdpPath(): string{
    return this.authService.backend + '/static/images/' + this.info_user.photo;
  }

  getRank(){
    let number_services = this.services_history_for.length + this.services_history_by.length;
    if( number_services < 0){
      this.rank = "undefined"
    }else if(number_services >= 0 && number_services <= 5){
      this.rank = "Débutant";
    }else if(number_services > 5 && number_services <= 10){
      this.rank = "Confirmé";
    }else if(number_services > 10){
      this.rank = "Expert";
    }
  }
}
