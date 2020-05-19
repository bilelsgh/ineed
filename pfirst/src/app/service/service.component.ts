import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  @Input() serviceName: string;
  @Input() ServiceType : string;
  @Input() serviceUser: string;
  @Input() serviceDescription : string;
  @Input() serviceImage : string;
  @Input() serviceDate : string;
  @Input() index : number;
  @Input() id : number;
  @Input() serviceLatitude: number;
  @Input() serviceLongitude: number;
  @Input() map =false;
  latitude:number;
  longitude: number;




  constructor() { }

  ngOnInit(): void {
    console.log("#IMAGE : " + this.serviceImage);
    this.latitude=this.serviceLatitude;
    this.longitude=this.serviceLongitude;
  }

  getUser(){
    return this.serviceUser;
  }

  getDescription(){
    return this.serviceDescription;
  }


}
