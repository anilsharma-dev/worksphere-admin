import {
  Component
}
from '@angular/core';

import {
  BaseChartDirective
}
from 'ng2-charts';

import {
  Chart,
  ChartConfiguration,
  ChartOptions,
  registerables
}
from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-analytics-chart',

  standalone: true,

  imports: [
    BaseChartDirective
  ],

  templateUrl:
    './analytics-chart.component.html',

  styleUrl:
    './analytics-chart.component.scss'
})

export class AnalyticsChartComponent {

  lineChartData:
    ChartConfiguration<'line'>['data']
    = {

    labels: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun'
    ],

    datasets: [

      {
        data: [
          1200,
          1900,
          3000,
          2500,
          4200,
          5100
        ],

        label: 'Revenue',

        fill: true,

        tension: 0.4
      }

    ]

  };

  lineChartOptions:
    ChartOptions<'line'>
    = {

    responsive: true,

    maintainAspectRatio: false

  };

}