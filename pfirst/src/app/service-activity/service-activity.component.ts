import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-service-activity',
  templateUrl: './service-activity.component.html',
  styleUrls: ['./service-activity.component.css']
})
export class ServiceActivityComponent implements OnInit {

  @Input() serviceName: string;
  @Input() ServiceType : string;
  @Input() serviceUser: string;
  @Input() serviceDescription : string;
  @Input() serviceImage : string;
  @Input() serviceDate : string;
  @Input() index : number;
  @Input() id : number;



  constructor() { }

  ngOnInit(): void {
  }

  getUser(){
    return this.serviceUser;
  }

  getDescription(){
    return this.serviceDescription;
  }

}
