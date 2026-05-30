import {
  ChangeDetectionStrategy,
  Component,
  inject
} from '@angular/core';
import { AnalyticsChartComponent } from '../../../../shared/components/analytics-chart/analytics-chart.component';
import { UsersStore } from '../../../users/store/users.store';

@Component({
  selector: 'app-dashboard-home',

  standalone: true,

  imports: [AnalyticsChartComponent],

  templateUrl:
    './dashboard-home.component.html',

  styleUrl:
    './dashboard-home.component.scss',

  changeDetection:
    ChangeDetectionStrategy.OnPush
})

export class DashboardHomeComponent {

private usersStore =
  inject(UsersStore);

totalUsers =
  this.usersStore.totalUsers;

activeUsers =
  this.usersStore.activeUsers;

  ngOnInit() {

    this.usersStore.loadUsers();
  }
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