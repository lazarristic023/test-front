import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private snackBar: MatSnackBar) { }

  showSnackbar(message: string, action: string = 'Close', duration: number = 5000, actionCallback?: () => void): MatSnackBarRef<any> {
    const snackBarRef = this.snackBar.open(message, action, {
      duration: duration,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });

    if (actionCallback) {
      snackBarRef.onAction().subscribe(() => {
        actionCallback();
        snackBarRef.dismiss();
      });
    }

    return snackBarRef;
  }
}
