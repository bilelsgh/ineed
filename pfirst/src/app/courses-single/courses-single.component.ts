import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses-single',
  templateUrl: './courses-single.component.html',
  styleUrls: ['./courses-single.component.css']
})
export class CoursesSingleComponent implements OnInit {

  Name: string = 'Courses';
  User: string = 'Utilisateur';
  Description: string = 'Description';
  Liste: any = [];
  Accompagne : string = 'oui';
  Budget : number = 55;
  Dispo: string="coucou"

  constructor(private serviceService: ServiceService,  private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.Name = this.serviceService.getServiceById(+id).name;
    this.User=this.serviceService.getServiceById(+id).user;
    this.Description = this.serviceService.getServiceById(+id).description;
    this.Liste= this.serviceService.getServiceById(+id).liste;
    this.Accompagne=this.serviceService.getServiceById(+id).accompagner;
    this.Budget=this.serviceService.getServiceById(+id).budget;
    this.Dispo=this.serviceService.getServiceById(+id).dispo;
  }


}
