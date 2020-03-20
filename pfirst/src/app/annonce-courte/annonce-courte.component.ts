import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-annonce-courte',
  templateUrl: './annonce-courte.component.html',
  styleUrls: ['./annonce-courte.component.css']
})
export class AnnonceCourteComponent implements OnInit {

  @Input() helper : string;
  @Input() helped : string;
  @Input() date : string;
  constructor() { }

  ngOnInit(): void {
  }

}
