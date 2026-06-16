import {
  Component,
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

import {
  AuthService
}
from '../../../../core/services/auth.service';

@Component({
  selector: 'app-profile-settings',

  standalone: true,

  imports: [
    ReactiveFormsModule
  ],

  templateUrl:
    './profile-settings.component.html',

  styleUrl:
    './profile-settings.component.scss'
})

export class ProfileSettingsComponent {

  private fb =
    inject(FormBuilder);

  private authService =
    inject(AuthService);

  currentRole =
    this.authService
      .currentUserRole;

  profileImage =
    signal<string | null>(
      localStorage.getItem(
        'profileImage'
      )
    );

  profileForm =
    this.fb.group({

      name: [
        'Anil Sharma',
        Validators.required
      ],

      email: [
        'anil@gmail.com',
        [
          Validators.required,
          Validators.email
        ]
      ],

      bio: [
        'Angular Developer'
      ]

    });

  onFileSelected(
    event: Event
  ) {

    const input =
      event.target as
      HTMLInputElement;

    if(
      !input.files?.length
    ) {

      return;
    }

    const file =
      input.files[0];

    const reader =
      new FileReader();

    reader.onload = () => {

      const image =
        reader.result as string;

      this.profileImage.set(
        image
      );

      localStorage.setItem(
        'profileImage',
        image
      );

    };

    reader.readAsDataURL(
      file
    );

  }

  changeRole(
    event: Event
  ) {

    const role =

      (
        event.target as HTMLSelectElement
      ).value as

      'admin'
      | 'manager'
      | 'user';

    this.authService
      .changeRole(role);

  }

  saveProfile() {

    localStorage.setItem(

      'profile',

      JSON.stringify(
        this.profileForm.value
      )

    );

    alert(
      'Profile saved successfully'
    );

  }

}