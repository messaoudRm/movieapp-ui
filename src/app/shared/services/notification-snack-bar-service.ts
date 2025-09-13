import {inject, Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationSnackBarService {

  private _snackBar = inject(MatSnackBar);
  private durationInSeconds = 3000;

  openSnackBar(message: string) {
    this._snackBar.open(message, '', {
      duration: this.durationInSeconds,
      horizontalPosition: 'right',
      verticalPosition: 'top',
    });
  }
}
