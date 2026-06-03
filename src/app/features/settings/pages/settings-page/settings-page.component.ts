import {
  Component,
  signal
}
from '@angular/core';

import {
  ProfileSettingsComponent
}
from '../../components/profile-settings/profile-settings.component';

import {
  SecuritySettingsComponent
}
from '../../components/security-settings/security-settings.component';

import {
  PreferencesSettingsComponent
}
from '../../components/preferences-settings/preferences-settings.component';

@Component({
  selector: 'app-settings-page',

  standalone: true,

  imports: [
    ProfileSettingsComponent,
    SecuritySettingsComponent,
    PreferencesSettingsComponent
  ],

  templateUrl:
    './settings-page.component.html',

  styleUrl:
    './settings-page.component.scss'
})

export class SettingsPageComponent {

  activeTab =
    signal<
      'profile'
      | 'security'
      | 'preferences'
    >(
      'profile'
    );

}