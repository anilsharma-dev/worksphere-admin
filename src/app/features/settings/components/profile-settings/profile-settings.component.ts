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
  selector: 'app-profile-settings',

  standalone: true,

  imports: [
    ReactiveFormsModule,
  ],

  templateUrl:
    './profile-settings.component.html',

  styleUrl:
    './profile-settings.component.scss'
})

export class ProfileSettingsComponent {

  
  private fb = inject(FormBuilder);
  profileForm = this.fb.group({name: [
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

      bio: ['Angular Developer']

    });

  saveProfile() {

    localStorage.setItem(
      'profile',
      JSON.stringify(
        this.profileForm.value
      )
    );

    alert('Profile saved');

  }

}