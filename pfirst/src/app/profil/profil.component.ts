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
  number_services_proposed : number;
  number_services_asked : number = 0;

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
          console.log('myProfil : ', this.myProfil);
        })
        .catch( () => {
          console.log('#Erreur de chargement profil');
        });
    });
    this.getServiceProposedAndFinished();
    this.getRank();
  }

  getPdpPath(): string{
    return this.authService.backend + '/static/images/' + this.info_user.photo;
  }

  getServiceProposedAndFinished(){
    this.userService.getServiceProposedAndFinished()
      .then( () => {
        this.number_services_proposed = this.userService.services_proposed_finished.length;
        this.getRank();
      })
      .catch( (e) => {
        console.log("Erreur récupération des services proposés #profil-component");
        this.number_services_proposed = -1;
        this.getRank();
      })
  }

  getServiceAskedAnfFinished(){};

  getRank(){
    let number_services = this.number_services_proposed + this.number_services_asked;
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
