import highcharts from 'highcharts';

import { ChartsTranslation } from '../interfaces/dashboard.interface';

export class DashboardConsts {
  public static areaChart: Highcharts.Options = {
    series: [],
    chart: {
      type: 'area',
      style: {
        fontFamily: 'proxima-regular',
      },
    },
    credits: { enabled: false },
    legend: {
      layout: 'horizontal',
      align: 'center',
      verticalAlign: 'bottom',
      borderColor: 'none',
    },
    title: { text: '', align: 'left' },
    xAxis: { categories: [] },
    yAxis: { title: { text: '' } },
    tooltip: {
      shared: true,
      borderColor: 'black',
      borderRadius: 2,
      borderWidth: 1,
      headerFormat: `<span style="font-size: 0.75rem">{point.key}</span><br/>`,
      pointFormatter() {
        const yFormatted = highcharts.numberFormat(this.y || 0, 0, '.', ',');
        return `
          ${this.series.name}
          <span style="color:${this.color}">●</span>:
          <b>${yFormatted}</b>
          <br/>
        `;
      },
      style: { color: 'white' },
    },
    plotOptions: {
      area: {
        connectEnds: true,
        lineWidth: 1,
        marker: { radius: 2 },
      },
    },
  };

  public static readonly seriesDataOptions: {
    [key: string]: Highcharts.SeriesOptionsType[];
  } = {
    travelers: [
      {
        name: ChartsTranslation.Travelers,
        data: [],
        type: 'area',
      },
    ],
    bookings: [
      {
        name: ChartsTranslation.RoomNights,
        data: [],
        type: 'area',
      },
      {
        name: ChartsTranslation.Bookings,
        data: [],
        type: 'area',
      },
    ],
  };
}
