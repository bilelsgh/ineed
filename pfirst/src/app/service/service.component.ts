import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.css']
})
export class ServiceComponent implements OnInit {

  @Input() serviceName: string;
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
