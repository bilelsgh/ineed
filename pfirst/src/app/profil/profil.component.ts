import {Component, OnInit} from '@angular/core';
import {UserService} from '../services/users.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {

  info_user: any;
  id: string;

  constructor(private userService: UserService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.subscribe( (pars)=> {
      this.id = pars['id'];
      this.userService.getProfilById(this.id).then(
        ()=> {
          this.info_user = this.userService.info_user;
        })
        .catch( () => {
          console.log("#Erreur de chargement profil")
        });
    });

    /*
    this.userService.getProfilById(this.id)
      .then(() => {
        this.info_user = this.userService.info_user;
      })
      .catch(() => {
        console.log("erreur de chargement profil");
      });
     */
  }

}
