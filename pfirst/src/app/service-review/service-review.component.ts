import {Component, Input, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-service-review',
  templateUrl: './service-review.component.html',
  styleUrls: ['./service-review.component.css']
})
export class ServiceReviewComponent implements OnInit {

  @Input() service;

  name : string;
  type : string;
  image : string
  id : number;


  constructor(public router : Router) { }

  ngOnInit(): void {
    let content = JSON.parse(this.service.content);
    this.name = content['user'];
    this.type = content['name'];
    this.image = content['image'];
    this.id = this.service.idAnnounce;
  }

}
