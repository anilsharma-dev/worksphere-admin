import {
  Injectable,
  inject
}
from '@angular/core';

import {
  MatDialog
}
from '@angular/material/dialog';

import {
  Observable
}
from 'rxjs';

import {
  ConfirmDialogComponent
}
from '../../shared/components/confirm-dialog/confirm-dialog.component';

@Injectable({
  providedIn: 'root'
})

export class ConfirmationService {

  private dialog =
    inject(MatDialog);

  confirm(

    title: string,

    message: string,

    confirmText = 'Confirm',

    cancelText = 'Cancel'

  ): Observable<boolean> {

    return this.dialog
      .open(
        ConfirmDialogComponent,
        {

          width: '420px',

          data: {

            title,

            message,

            confirmText,

            cancelText

          }

        }
      )
      .afterClosed();

  }

}