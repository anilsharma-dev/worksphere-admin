import {
  ChangeDetectionStrategy,
  Component
} from '@angular/core';

@Component({
  selector: 'app-dashboard-home',

  standalone: true,

  imports: [],

  templateUrl:
    './dashboard-home.component.html',

  styleUrl:
    './dashboard-home.component.scss',

  changeDetection:
    ChangeDetectionStrategy.OnPush
})

export class DashboardHomeComponent {

  activities = [

    {
      user: 'Anil',
      action: 'created a new user'
    },

    {
      user: 'Sarah',
      action: 'updated dashboard settings'
    },

    {
      user: 'David',
      action: 'deleted inactive account'
    },

    {
      user: 'John',
      action: 'generated monthly report'
    }

  ];

}