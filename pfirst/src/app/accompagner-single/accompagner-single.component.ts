import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-accompagner-single',
  templateUrl: './accompagner-single.component.html',
  styleUrls: ['./accompagner-single.component.css']
})
export class AccompagnerSingleComponent implements OnInit {

  Name: string = 'Courses';
  User: string = 'Utilisateur';
  Description: string = 'Description';
  Local:string = 'oui';
  Dispo : string = 'oui';
  Quand : string = "caca";
  Kind: string = "non"

  constructor(private serviceService: ServiceService,  private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.Name = this.serviceService.getServiceById(+id).name;
    this.User=this.serviceService.getServiceById(+id).user;
    this.Description = this.serviceService.getServiceById(+id).description;
    this.Local= this.serviceService.getServiceById(+id).local;
    this.Dispo=this.serviceService.getServiceById(+id).dispo;
    this.Quand=this.serviceService.getServiceById(+id).quand;
    this.Kind=this.serviceService.getServiceById(+id).kind;

  }

}
