import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-single-service',
  templateUrl: './single-service.component.html',
  styleUrls: ['./single-service.component.css']
})

export class SingleServiceComponent implements OnInit {

  serviceDescriptor: any;
  name: string = 'Action';
  user: string = 'Utilisateur';
  description: string = 'Description';
  type: string ;

  constructor(private serviceService: ServiceService,  private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    this.serviceService.getServiceById(+id)
      .then(()=>{
        this.serviceDescriptor = this.serviceService.current_service;
        this.name = this.serviceDescriptor.name;
        this.user = this.serviceDescriptor.user;
        this.description = this.serviceDescriptor.description;
        this.type= this.serviceDescriptor.type;
      })
      .catch(()=>{console.log("Erreur de récupération du service courant au niveau single-service")});
  }

}
