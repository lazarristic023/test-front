import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private snackBar: MatSnackBar) { }

  showSnackbar(message: string, action: string = 'Close'): void {
    this.snackBar.open(message, action, {
      duration: 5000, // Trajanje prikaza u milisekundama (opcionalno)
      horizontalPosition: 'center', // Horizontalna pozicija toast/snackbar-a
      verticalPosition: 'bottom' // Vertikalna pozicija toast/snackbar-a
    });
  }
}
