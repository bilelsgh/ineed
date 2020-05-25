import {Component} from '@angular/core';
import {MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition} from '@angular/material/snack-bar';

@Component({
  selector: 'app-mat-snack-bar',
  templateUrl: './mat-snack-bar.component.html',
  styleUrls: ['./mat-snack-bar.component.css']
})
export class MatSnackBarComponent{

  constructor(public snackBar: MatSnackBar) {}

  // this function will open up snackbar on top right position with custom background color (defined in css)
  openSnackBar(message: string, action: string, className : string, vert: MatSnackBarVerticalPosition, horz: MatSnackBarHorizontalPosition) {

    this.snackBar.open(message, action, {
      duration: 2000,
      verticalPosition: vert,
      horizontalPosition: horz,
      panelClass: [className],
    });
  }

}
