import { Component, OnInit } from '@angular/core';
//import { ViewChild } from '@angular/core';
//import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
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

  index_for: number;
  index_by: number;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.history_by = this.userService.services_history_by;
    this.history_for = this.userService.services_history_for;
    this.index_by = this.history_by.length - 1;
    this.index_for = this.history_for.length - 1;
  }

  incIndex(){
    if (this.showFor) {
      this.index_for++;
      if (this.index_for >= this.history_for.length){
        this.index_for = 0;
      }
    }else{
      this.index_by++;
      if (this.index_by >= this.history_by.length) {
        this.index_by = 0;
      }
    }
  }

  decIndex(){
    if (this.showFor) {
      this.index_for--;
      if (this.index_for < 0) {
        this.index_for = this.history_for.length - 1;
      }
      console.log("categorie uodated : "+this.history_for[this.index_for].categorie);

    } else {
      this.index_by--;
      if (this.index_by < 0) {
        this.index_by = this.history_by.length-1;
      }
      console.log("categorie uodated : "+this.history_by[this.index_by].categorie);
    }
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
