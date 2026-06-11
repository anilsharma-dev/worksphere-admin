import {
  HttpErrorResponse,
  HttpInterceptorFn
}
from '@angular/common/http';

import {
  inject
}
from '@angular/core';

import {
  catchError,
  throwError
}
from 'rxjs';

import {
  ToastService
}
from '../services/toast.service';

export const errorInterceptor:
HttpInterceptorFn = (

  req,
  next

) => {

  const toastService =
    inject(ToastService);

  return next(req).pipe(

    catchError(
      (
        error:
        HttpErrorResponse
      ) => {

        let message =
          'Something went wrong';

        switch(
          error.status
        ) {

          case 0:

            message =
              'Unable to connect to server';

            break;

          case 400:

            message =
              'Bad request';

            break;

          case 401:

            message =
              'Unauthorized access';

            break;

          case 403:

            message =
              'Access denied';

            break;

          case 404:

            message =
              'Resource not found';

            break;

          case 500:

            message =
              'Internal server error';

            break;

        }

        toastService.error(
          message
        );

        return throwError(
          () => error
        );

      }
    )

  );

};