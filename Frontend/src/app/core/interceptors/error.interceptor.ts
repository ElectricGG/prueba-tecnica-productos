import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, throwError } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let message = 'Ha ocurrido un error inesperado';

      if (error.status === 400) {
        const body = error.error as ApiResponse<unknown>;
        if (body?.errors && body.errors.length > 0) {
          message = body.errors.join(', ');
        } else if (body?.message) {
          message = body.message;
        } else {
          message = 'Solicitud inválida';
        }
      } else if (error.status === 404) {
        message = 'Recurso no encontrado';
      } else if (error.status === 500) {
        message = 'Error interno del servidor';
      } else if (error.status === 0) {
        message = 'No se pudo conectar con el servidor';
      }

      snackBar.open(message, 'Cerrar', {
        duration: 5000,
        horizontalPosition: 'end',
        verticalPosition: 'top',
        panelClass: ['snackbar-error']
      });

      return throwError(() => error);
    })
  );
};
