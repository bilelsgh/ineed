import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { ActivatedRoute, Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import {AuthService} from '../services/auth.service';
import {UserService} from '../services/users.service';

@Component({
  selector: 'app-menage-single',
  templateUrl: './menage-single.component.html',
  styleUrls: ['./menage-single.component.css']
})
export class MenageSingleComponent implements OnInit {

  Name: string = 'Courses';
  User: string = 'Utilisateur';
  Description: string = 'Description';
  Materiel: any = [];
  Date : string = 'oui';
  Heure: string ="";
  Salle: string ="";
  Localisation: string;
  Surface : number;
  liste_a_copier : string;
  copied = false;


  constructor(private serviceService: ServiceService,  private route: ActivatedRoute, private router: Router,
              private httpClient : HttpClient, private auth : AuthService, private userserv : UserService) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.Name = this.serviceService.getServiceById(+id).name;
    this.User=this.serviceService.getServiceById(+id).user;
    this.Description = this.serviceService.getServiceById(+id).description;
    this.Materiel= this.serviceService.getServiceById(+id).materiel;
    this.Date=this.serviceService.getServiceById(+id).date;
    this.Surface=this.serviceService.getServiceById(+id).surface;
    this.Heure=this.serviceService.getServiceById(+id).heure;
    this.Salle=this.serviceService.getServiceById(+id).salle;
    this.Localisation=this.serviceService.getServiceById(+id).localisation;
    this.writeList();
    this.copied = false;
  }

  writeList(){
    let current : string;
    for(let elt of this.Materiel){
      current = '\n' + elt;
      this.liste_a_copier += current;

    }
  }
  copyToClipboard(val : string){
    this.copied = true;
    let selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = val;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
  }

  goProfil(){
    this.httpClient
      .get<any[]>(this.auth.backend_test+'other_user.json')
      .subscribe(
        (response) => {

          this.userserv.info_user = response;
          console.log("#OK");
          console.log("#SERVICES : " + response);
        },
        (error) => {
          console.log("Erreur de chargement : " + error);
        }
      );
    this.router.navigate(['profil']);
  }

}
