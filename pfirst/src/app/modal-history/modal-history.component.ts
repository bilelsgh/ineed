import { Component, OnInit } from '@angular/core';
import {UserService} from "../services/users.service";

@Component({
  selector: 'app-modal-history',
  templateUrl: './modal-history.component.html',
  styleUrls: ['./modal-history.component.css']
})
export class ModalHistoryComponent implements OnInit {

  history_for: any[];
  history_by: any[];

  showFor: boolean = true;
  showBy: boolean = false;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.history_by = this.userService.services_history_by;
    this.history_for = this.userService.services_history_for;
  }

  setFor() {
    this.showBy = false;
    this.showFor = true;
  }

  setBy() {
    this.showFor = false;
    this.showBy = true;
  }
}
