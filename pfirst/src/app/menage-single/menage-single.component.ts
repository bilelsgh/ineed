import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { ActivatedRoute, Router } from '@angular/router';

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
  Dispo : string = 'oui';
  Surface : number = 55;

  constructor(private serviceService: ServiceService,  private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.Name = this.serviceService.getServiceById(+id).name;
    this.User=this.serviceService.getServiceById(+id).user;
    this.Description = this.serviceService.getServiceById(+id).description;
    this.Materiel= this.serviceService.getServiceById(+id).materiel;
    this.Dispo=this.serviceService.getServiceById(+id).dispo;
    this.Surface=this.serviceService.getServiceById(+id).surface;
  }


}
