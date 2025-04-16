import { Component, Input } from '@angular/core';

import { Chart } from 'angular-highcharts';

@Component({
  selector: 'rx-dashboard-charts',
  templateUrl: './dashboard-charts.component.html',
})
export class DashboardChartsComponent {
  @Input() isLoading: boolean;
  @Input() totalSpendChart: Chart;
  @Input() averageSpendChart: Chart;
  @Input() totalBookingsChart: Chart;
  @Input() totalTravelersChart: Chart;
}
