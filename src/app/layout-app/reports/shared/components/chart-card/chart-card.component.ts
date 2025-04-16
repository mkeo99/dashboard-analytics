import { Component, Input } from '@angular/core';

import { Chart } from 'angular-highcharts';

interface SeriesWithData {
  data: number[];
}

@Component({
  selector: 'rx-chart-card',
  templateUrl: './chart-card.component.html',
  styleUrls: ['./chart-card.component.scss'],
})
export class ChartCardComponent {
  @Input() title: string;
  @Input() isLoading: boolean;
  @Input() chartDefinitions: Chart;

  get hasData(): boolean {
    if (!this.chartDefinitions) {
      return false;
    }
    const chartSeries = this.chartDefinitions['options']['series'];
    return this.hasAtLeastOneValidValue(chartSeries);
  }

  // tslint:disable-next-line: no-any
  private hasAtLeastOneValidValue(series: any[]): boolean {
    return (
      !!series.length &&
      series.some((seriesValue: SeriesWithData) => !!seriesValue.data.length)
    );
  }
}
