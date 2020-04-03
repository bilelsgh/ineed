import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-single-service',
  templateUrl: './single-service.component.html',
  styleUrls: ['./single-service.component.css']
})
export class SingleServiceComponent implements OnInit {

  name: string = 'Action';
  user: string = 'Utilisateur';
  description: string = 'Description';
  type: string ="service"

  constructor(private serviceService: ServiceService,  private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.name = this.serviceService.getServiceById(+id).name;
    this.user=this.serviceService.getServiceById(+id).user;
    this.description = this.serviceService.getServiceById(+id).description;
    this.type= this.serviceService.getServiceById(+id).type;
  }

}
