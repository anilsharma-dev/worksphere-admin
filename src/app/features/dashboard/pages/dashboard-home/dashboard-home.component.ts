import { Component } from '@angular/core';
import { StatsCardComponent } from '../../components/stats-card/stats-card.component';
import { ChartsSectionComponent } from '../../components/charts-section/charts-section.component';

@Component({
  selector: 'app-dashboard-home',
  standalone: true,
  imports: [
    StatsCardComponent,
    ChartsSectionComponent
  ],
  templateUrl: './dashboard-home.component.html',
  styleUrl: './dashboard-home.component.scss'
})
export class DashboardHomeComponent {

}
