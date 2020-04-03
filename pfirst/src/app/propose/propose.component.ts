import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../services/service.service';

@Component({
  selector: 'app-service-view',
  templateUrl: './propose.component.html',
  styleUrls: ['./propose.component.css']
})
export class ServiceViewComponent implements OnInit {
  type: any[];
  types : any[];
  services: any[];

  constructor (private serviceService : ServiceService){

    
  }
  ngOnInit(){
    this.services=this.serviceService.services
    

    
  }

}
