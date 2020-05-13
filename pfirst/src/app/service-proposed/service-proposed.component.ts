import {Component, Input, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-service-proposed',
  templateUrl: './service-proposed.component.html',
  styleUrls: ['./service-proposed.component.css']
})
export class ServiceProposedComponent implements OnInit {

  @Input() serviceName: string;
  @Input() ServiceType : string;
  @Input() serviceUser: string;
  @Input() serviceDescription : string;
  @Input() serviceImage : string;
  @Input() serviceDate : string;
  @Input() index : number;
  @Input() id : number;



  constructor(private httpClient : HttpClient) { }

  ngOnInit(): void {
    console.log("#IMAGE : " + this.serviceImage);
  }

  getUser(){
    return this.serviceUser;
  }

  getDescription(){
    return this.serviceDescription;
  }



}
