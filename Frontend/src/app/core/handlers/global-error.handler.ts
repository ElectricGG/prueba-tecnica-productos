import { ErrorHandler, Injectable, inject, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  private snackBar = inject(MatSnackBar);
  private zone = inject(NgZone);

  handleError(error: unknown): void {
    console.error('Error no controlado:', error);

    this.zone.run(() => {
      this.snackBar.open('Ha ocurrido un error inesperado', 'Cerrar', {
        duration: 5000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error']
      });
    });
  }
}
