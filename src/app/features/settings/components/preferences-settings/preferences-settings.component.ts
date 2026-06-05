import {
  Component,
  signal
}
from '@angular/core';

@Component({
  selector: 'app-preferences-settings',

  standalone: true,

  templateUrl:
    './preferences-settings.component.html',

  styleUrl:
    './preferences-settings.component.scss'
})

export class PreferencesSettingsComponent {

  emailNotifications =
    signal(true);

  weeklyReports =
    signal(false);

  compactMode =
    signal(false);

  language =
    signal('English');

  toggleEmailNotifications() {

    this.emailNotifications.update(
      value => !value
    );

  }

  toggleWeeklyReports() {

    this.weeklyReports.update(
      value => !value
    );

  }

  toggleCompactMode() {

    this.compactMode.update(
      value => !value
    );

  }

}