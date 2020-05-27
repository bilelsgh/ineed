import { Component, OnInit, Input } from '@angular/core';
import { Menage } from '../models/Menage.model';

@Component({
  selector: 'app-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrls: ['./mini-map.component.css']
})
export class MiniMapComponent implements OnInit {

  @Input() latitude:number;
  @Input() longitude:number;
  @Input() zoom:number;
  service_descriptor: Menage;
  constructor() { } 

  ngOnInit(): void { 

  //this.latitude=this.service_descriptor.content.latitude;
  //this.longitude=this.service_descriptor.content.longitude;
    
   /* var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 13,
      center: {lat: this.service_descriptor.content.latitude, lng: this.service_descriptor.content.longitude},
      mapTypeId: 'terrain'
    });
    var cityCircle = new google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: map,
      center: this.map.center,
      radius: Math.sqrt(citymap[city].population) * 100
    });

  }*/
  }

  

}
