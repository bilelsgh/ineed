import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-modal-user',
  templateUrl: './modal-user.component.html',
  styleUrls: ['./modal-user.component.css']
})
export class ModalUserComponent implements OnInit {

  constructor(public matDialogRef: MatDialogRef<ModalUserComponent>) { }

  ngOnInit(): void {
  }

  closeUserModal(){
    this.matDialogRef.close();
  }

}
