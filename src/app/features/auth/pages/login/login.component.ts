import {
  Component,
  inject
}
from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
}
from '@angular/forms';

import {
  CommonModule
}
from '@angular/common';
import { AuthService } from '../../../../core/services/auth.service';



@Component({
  selector: 'app-login',

  standalone: true,

  imports: [
    CommonModule,
    ReactiveFormsModule
  ],

  templateUrl:
    './login.component.html',

  styleUrl:
    './login.component.scss'
})

export class LoginComponent {

  private fb =
    inject(FormBuilder);

  private authService =
    inject(AuthService);

  errorMessage = '';

  loginForm =
    this.fb.group({

      email: [
        '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      password: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ]

    });

  onSubmit() {

    if(
      this.loginForm.invalid
    ) {

      this.loginForm.markAllAsTouched();

      return;
    }

    const {
      email,
      password
    } =
      this.loginForm.getRawValue();

    const success =
      this.authService.login(
        email!,
        password!
      );

    if(!success) {

      this.errorMessage =
        'Invalid credentials';
    }

  }

}