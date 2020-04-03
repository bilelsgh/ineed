import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-demande',
  templateUrl: './demande.component.html',
  styleUrls: ['./demande.component.css']
})
export class DemandeComponent implements OnInit {
  accompagner : boolean = false;
  cuisine : boolean = false;
  menage : boolean = true;
  course: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

}
