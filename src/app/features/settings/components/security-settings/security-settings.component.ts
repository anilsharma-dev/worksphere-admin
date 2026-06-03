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

@Component({
  selector: 'app-security-settings',

  standalone: true,

  imports: [
    ReactiveFormsModule
  ],

  templateUrl:
    './security-settings.component.html',

  styleUrl:
    './security-settings.component.scss'
})

export class SecuritySettingsComponent {

 
 private fb = inject(FormBuilder);
  passwordForm =
    this.fb.group({

      currentPassword: [
        '',
        Validators.required
      ],

      newPassword: [
        '',
        [
          Validators.required,
          Validators.minLength(6)
        ]
      ],

      confirmPassword: [
        '',
        Validators.required
      ]

    });

  changePassword() {

    alert(
      'Password changed'
    );

  }

}