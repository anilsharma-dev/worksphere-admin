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
  profileImage =
  signal<string | null>(
    localStorage.getItem(
      'profileImage'
    )
  );
 
  onFileSelected(
  event: Event
) {

  const input = event.target as HTMLInputElement;

  if(!input.files?.length) {
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

  reader.readAsDataURL(file);

}

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