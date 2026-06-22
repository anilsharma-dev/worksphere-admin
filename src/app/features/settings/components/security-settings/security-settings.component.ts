import {
  Component,
  computed,
  inject,
  signal
}
from '@angular/core';

import {
  FormBuilder,
  ReactiveFormsModule,
  Validators
}
from '@angular/forms';
import { NotificationService } from '../../../../core/services/notification.service';

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

  private fb =
    inject(FormBuilder);

  showCurrentPassword =
    signal(false);

  showNewPassword =
    signal(false);

  showConfirmPassword =
    signal(false);
    private notificationService =
  inject(NotificationService);

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

  passwordsMatch =
    computed(() => {

      return (
        this.passwordForm.value
          .newPassword
        ===
        this.passwordForm.value
          .confirmPassword
      );

    });

  toggleCurrentPassword() {

    this.showCurrentPassword.update(
      value => !value
    );

  }

  toggleNewPassword() {

    this.showNewPassword.update(
      value => !value
    );

  }

  toggleConfirmPassword() {

    this.showConfirmPassword.update(
      value => !value
    );

  }

  changePassword() {

    if(
      this.passwordForm.invalid
      ||
      !this.passwordsMatch()
    ) {
      return;
    }

    this.notificationService.success(
      'Password changed successfully'
    );

    this.passwordForm.reset();

  }

}