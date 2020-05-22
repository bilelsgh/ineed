import { Component, OnInit } from '@angular/core';
import {SuiviService} from '../services/suivi.service';

@Component({
  selector: 'app-modal-are-you-sure',
  templateUrl: './modal-are-you-sure.component.html',
  styleUrls: ['./modal-are-you-sure.component.css']
})
export class ModalAreYouSureComponent implements OnInit {

  constructor(public suiviServ : SuiviService) { }

  ngOnInit(): void {
  }

}
