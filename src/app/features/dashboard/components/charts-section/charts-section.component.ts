import { Component } from '@angular/core';
import {
  NgApexchartsModule,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis
} from 'ng-apexcharts';

@Component({
  selector: 'app-charts-section',
  standalone: true,
  imports: [NgApexchartsModule],
  templateUrl: './charts-section.component.html',
  styleUrl: './charts-section.component.scss'
})
export class ChartsSectionComponent {

  chartSeries: ApexAxisChartSeries = [
    {
      name: 'Revenue',
      data: [10, 25, 18, 40, 55, 70]
    }
  ];

  chartDetails: ApexChart = {
    type: 'line',
    height: 350
  };

  chartXAxis: ApexXAxis = {
    categories: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun'
    ]
  };

}
