import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-annonce-courte',
  templateUrl: './annonce-courte.component.html',
  styleUrls: ['./annonce-courte.component.css']
})
export class AnnonceCourteComponent implements OnInit {

  @Input() image : string;
  @Input() helped : string;
  @Input() date : string;
  @Input() service : string

  constructor() { }

  ngOnInit(): void {
    /*if(this.service === "cuisine"){
      this.image = "../assets/data/cuisine_pour_annonce_courte.jpg" ;
    }else if(this.service === "menage"){
      this.image = "../assets/data/menage_pour_annonce_courte.jpg";
    }else if(this.service === "accompagne"){
      this.image = "../assets/data/accompagne_pour_annonce_courte.jpg";
    }*/

  }

}
