import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  @Input() prenom_user : string;
  @Input() nom_user : string;
  @Input() sexe_user : string;
  @Input() mail_user : string;

  constructor() { }

  ngOnInit(){
  }

}
