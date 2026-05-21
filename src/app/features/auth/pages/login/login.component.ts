import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AuthService } from '../../../../core/services/auth.service';

@Component({
    selector: 'app-login',
    imports: [FormsModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {

  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onLogin() {

    const success = this.authService.login(
      this.email,
      this.password
    );

    if(success) {
      this.router.navigate(['/']);
    }
  }
}