import { Options } from 'highcharts';

import { ReportData } from '.';

export interface IDashboardState {
  dashboard: DashboardResponse;
  hotels: Options;
  users: Options;
  passengers: Options;
  loading: boolean;
}

export interface DashboardRequest {
  startDate: string;
  endDate: string;
  dateType: string;
  currencyCode: string;
}

export type TopCardsType = 'tophotels' | 'topusers' | 'toppassengers';

export interface DashboardResponse {
  dashboard: DashboardSummary;
  reservationVals: IReservationValues;
}

export interface DashboardResponseParsed {
  dashboard: DashboardResponse;
  hotels: ReportData[];
  users: ReportData[];
  passengers: ReportData[];
}

export interface DashboardSummary {
  saving: number;
  savingPercent: number;
  totalSpend: number;
  wouldSpend: number;
  currency: string;
}

export interface IReservationValues {
  currencies: string[];
  datePoints: string[];
  results: IDashboardData[];
}

export interface IDashboardData {
  Currency: string;
  PAXAVG: number;
  RESERVATIONAVG: number;
  ROOMAVG: number;
  TOTALPAX: number;
  TOTALRESERVATIONS: number;
  TOTALROOMS: number;
  TOTALSPEND: number;
  range: string;
}

export interface IDashboardLineChart {
  chart: { height: number };
  credits: { enabled: boolean };
  title: { text: string };
  xAxis: { categories: [] };
  exporting: {
    buttons: {
      contextButton: {
        align: string;
        x: number;
      };
    };
  };
  legend: {
    layout: string;
    align: string;
    verticalAlign: string;
    borderColor: string;
  };
  series: [];
}

export interface IDashboardPieItem {
  name: string;
  y: number;
}

export interface TopPolicyOffendersRequest {
  filter: DateTypeFilter;
  settings: CurrencyCode;
  summaryType: string;
  summaryBy: string[];
}

export interface RequestWithMetaTags {
  filter: DateTypeFilter;
  settings: CurrencyCode;
  pageSettings: {
    pageNumber: number;
    pageSize: number;
  };
  groupBy: string;
}

export interface DateTypeFilter {
  dateFilter: DateFilter;
}

export interface DateFilter {
  from: string;
  to: string;
  type: string | undefined;
}

export interface CurrencyCode {
  currencyCode: string;
}

export enum ChartsTranslation {
  TotalSpend = 'reports.dashboard.charts.totalSpend',
  AverageSpend = 'reports.dashboard.charts.averageSpend',
  TotalBookings = 'reports.dashboard.charts.totalBookings',
  TotalTravelers = 'reports.dashboard.charts.totalTravelers',
  PerBooking = 'reports.dashboard.charts.perBooking',
  PerNight = 'reports.dashboard.charts.perNight',
  Bookings = 'reports.dashboard.charts.bookings',
  RoomNights = 'reports.dashboard.charts.roomNights',
  Travelers = 'reports.dashboard.charts.travelers',
}

export type DataPoints = number[];

export interface DataPointsPerCurrency {
  [key: string]: DataPoints;
}
