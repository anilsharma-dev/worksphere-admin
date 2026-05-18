import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isLoggedIn = signal(false);

  login(email: string, password: string) {

    if(email && password) {

      const fakeToken = 'jwt-token-123';

      localStorage.setItem('token', fakeToken);

      this.isLoggedIn.set(true);

      return true;
    }

    return false;
  }

  logout() {
    localStorage.removeItem('token');
    this.isLoggedIn.set(false);
  }

  checkAuth() {
    return !!localStorage.getItem('token');
  }
}