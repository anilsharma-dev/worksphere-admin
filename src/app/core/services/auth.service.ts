import {
  Injectable,
  inject,
  signal
}
from '@angular/core';

import {
  Router
}
from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private router =
    inject(Router);

  isAuthenticated =
    signal(
      !!localStorage.getItem('token')
    );

  login(
    email: string,
    password: string
  ) {

    if(
      email === 'admin@gmail.com'
      &&
      password === 'admin123'
    ) {

      localStorage.setItem(
        'token',
        'fake-jwt-token'
      );

      localStorage.setItem(
        'role',
        'admin'
      );

      this.isAuthenticated.set(true);

      this.router.navigate(['/']);

      return true;
    }

    return false;
  }

  logout() {

    localStorage.removeItem('token');

    localStorage.removeItem('role');

    this.isAuthenticated.set(false);

    this.router.navigate(['/login']);
  }

  isLoggedIn() {

    return !!localStorage.getItem(
      'token'
    );
  }

}