import {
  inject
}
from '@angular/core';

import {
  CanActivateFn,
  Router
}
from '@angular/router';

import {
  AuthService
}
from '../services/auth.service';

export const roleGuard:
CanActivateFn = route => {

  const authService =
    inject(AuthService);

  const router =
    inject(Router);

  const requiredRole =
    route.data['role'];

  const currentRole =
    authService
      .currentUserRole();

  if(
    currentRole ===
    'admin'
  ) {

    return true;

  }

  if(
    currentRole ===
    requiredRole
  ) {

    return true;

  }

  router.navigate([
  '/access-denied'
  ]);

  return false;

};