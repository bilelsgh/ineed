import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {

  proposed_services: any[] = [
    {
      content: {
        budget: '98',
        datejour: '30/03/2002',
        description: 'J\'ai faim la vie de maman',
        image: '../assets/data/cuisine_pour_annonce_courte.jpg',
        name: 'Faire les courses',
        type: 'service1',
        user: 'Jean Paul Gauthier',
      }
    },
    {
      content: {
        budget: '98',
        datejour: '30/03/2002',
        description: 'J\'ai faim la vie de maman',
        image: '../assets/data/accompagne_pour_annonce_courte.jpg',
        name: 'Faire les courses',
        type: 'service1',
        user: 'Jean Paul Gauthier',
      }
    },
  ]
  ;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
  }

}
