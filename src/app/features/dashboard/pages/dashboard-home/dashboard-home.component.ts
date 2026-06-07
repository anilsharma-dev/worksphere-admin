import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal
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

private usersStore = inject(UsersStore);
selectedRange = signal('month');

totalUsers = this.usersStore.totalUsers;

activeUsers = this.usersStore.activeUsers;

  ngOnInit() {

    this.usersStore.loadUsers();
  }
  dashboardStats =
  computed(() => {

    switch(
      this.selectedRange()
    ) {

      case 'today':

        return {

          revenue: '$2K',
          sessions: 42,
          conversion: '58%'

        };

      case 'week':

        return {

          revenue: '$8K',
          sessions: 120,
          conversion: '65%'

        };

      case 'year':

        return {

          revenue: '$240K',
          sessions: 8400,
          conversion: '81%'

        };

      default:

        return {

          revenue: '$24K',
          sessions: 342,
          conversion: '78%'

        };

    }

  });
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