import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/users.service';

@Component({
  selector: 'app-niveau',
  templateUrl: './niveau.component.html',
  styleUrls: ['./niveau.component.css']
})
export class NiveauComponent implements OnInit {

  constructor(private userServ: UserService) { }
  niveau: number;
  percentage: number;
  doneBeforeNext: number;
  niveauLabels: { [id: number] : string; } = {
    1: "Novice",
    2:"Intermédiaire",
    3:"Confirmé"
  };

  ngOnInit(): void {
    this.niveau = this.userServ.getNiveau();
    this.doneBeforeNext = ( (this.userServ.services_history_for.length + this.userServ.services_history_by.length) % 5); // pour le moment 5 services pour passer d'un niv a l'autre
    this.percentage = (this.doneBeforeNext / 5) * 100;
  }
}
