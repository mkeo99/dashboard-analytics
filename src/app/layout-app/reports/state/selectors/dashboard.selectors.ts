import { createSelector } from '@ngrx/store';
import { differenceInDays, format } from 'date-fns';
import { SeriesOptionsType } from 'highcharts';

import {
  DAY_AND_MONTH_NAME,
  DAY_HOUR_12_CLOCK,
  HOUR_12_CLOCK,
  MONTH_NAME_AND_YEAR,
} from '@app/core/constants';
import {
  ChartsTranslation,
  DashboardConsts,
  DashboardResponse,
  DashboardSummary,
  DataPoints,
  DataPointsPerCurrency,
  IDashboardData,
  IReservationValues,
  ReportData,
} from '@reports/shared';

import { DashboardState, ReportsState } from '../reducers/reports.reducer';
import { reportsState } from './reports.selectors';

const parseDashboardReportType = (items: ReportData[], field: string) => {
  if (!items.length) {
    return [];
  }
  return items
    .filter(item => item && item[field])
    .map(item => ({ name: item[field], value: item.ReservationCount }));
};

const filterByCurrency = (
  results: IDashboardData[],
  currency: string
): IDashboardData[] => {
  return results.filter(
    (result: IDashboardData) => result.Currency === currency
  );
};

const formatDatePoint = (datePoints: string[]): string[] => {
  const firstDate = new Date(datePoints[0]);
  const lastDate = new Date(datePoints[datePoints.length - 1]);
  const over60DaysDifference = differenceInDays(lastDate, firstDate) > 60;
  const lessThan2DaysDifference = differenceInDays(lastDate, firstDate) < 2;

  if (lessThan2DaysDifference) {
    const xyz = datePoints.map((date, index) => {
      const dateFormat2Days =
        index === 0 || index === 24 ? DAY_HOUR_12_CLOCK : HOUR_12_CLOCK;
      return format(new Date(date), dateFormat2Days);
    });
    return xyz;
  }

  const formatType = over60DaysDifference
    ? MONTH_NAME_AND_YEAR
    : DAY_AND_MONTH_NAME;

  return datePoints.map(date => format(new Date(date), formatType));
};

const sumResultsOfSameDatePoint = (
  results: IDashboardData[],
  datePoint: string,
  key: string
): number => {
  return results
    .filter(result => result.range === datePoint)
    .reduce((acc, result) => Math.round(acc + result[key]), 0);
};

const getDataPointsPerCurrency = (
  results: IDashboardData[],
  datePoints: string[],
  key: string
): DataPoints => {
  if (!results.length) {
    return [];
  }
  return datePoints.map(datePoint =>
    sumResultsOfSameDatePoint(results, datePoint, key)
  );
};

const getDataPoints = (
  results: IDashboardData[],
  datePoints: string[],
  currencies: string[],
  key: string
): DataPointsPerCurrency => {
  if (!results.length) {
    return {};
  }
  return currencies.reduce((accumulator, currency) => {
    const resultsFilteredByCurrency = filterByCurrency(results, currency);
    const dataOfCurrency = getDataPointsPerCurrency(
      resultsFilteredByCurrency,
      datePoints,
      key
    );
    if (dataOfCurrency.length) {
      accumulator[currency] = dataOfCurrency;
    }
    return accumulator;
  }, {});
};

const createAreaChart = (
  dates: string[],
  series: SeriesOptionsType[]
): Highcharts.Options => {
  const chartDefinitions: Highcharts.Options = {
    ...DashboardConsts.areaChart,
    series,
    xAxis: { ...DashboardConsts.areaChart.xAxis, categories: dates },
  };
  return chartDefinitions;
};

const getSeriesPerCurrency = (
  dataPointsPerCurrency: DataPointsPerCurrency,
  namePrefix?: ChartsTranslation
): SeriesOptionsType[] => {
  const currencies = Object.keys(dataPointsPerCurrency);
  return currencies.map(currency => {
    const name = namePrefix ? `${namePrefix}{{${currency}}}` : currency;
    return {
      name,
      data: dataPointsPerCurrency[currency],
      type: 'area',
    } as SeriesOptionsType;
  });
};

const getSeries = (
  seriesOptions: SeriesOptionsType[],
  seriesData: number[][]
): SeriesOptionsType[] => {
  return seriesOptions.map(
    (options, index) =>
      ({ ...options, data: seriesData[index] } as SeriesOptionsType)
  );
};

export const selectDashboardReport = createSelector(
  reportsState,
  (state: ReportsState) => state.dashboard
);

export const selectDashboardLoadings = createSelector(
  selectDashboardReport,
  (dashboard: DashboardState) => dashboard.loadings
);

export const selectHotels = createSelector(
  selectDashboardReport,
  (dashboard: DashboardState) =>
    parseDashboardReportType(dashboard.hotels, 'HotelName')
);

export const selectPassengers = createSelector(
  selectDashboardReport,
  (dashboard: DashboardState) =>
    parseDashboardReportType(dashboard.passengers, 'PassengerName')
);

export const selectUsers = createSelector(
  selectDashboardReport,
  (dashboard: DashboardState) =>
    parseDashboardReportType(dashboard.users, 'Username')
);

export const selectTotals = createSelector(
  selectDashboardReport,
  (dashboard: DashboardResponse) => dashboard.dashboard
);

export const selectTotalSpend = createSelector(
  selectTotals,
  (summary: DashboardSummary) => summary.totalSpend
);

export const selectTotalSaving = createSelector(
  selectTotals,
  (summary: DashboardSummary) => summary.saving
);

export const selectReservationVals = createSelector(
  selectDashboardReport,
  (dashboard: DashboardResponse) => dashboard.reservationVals
);

export const selectResults = createSelector(
  selectReservationVals,
  (reservations: IReservationValues) => reservations.results
);

export const selectTotalRooms = createSelector(
  selectResults,
  (results: IDashboardData[]) =>
    results.reduce((acc, result) => acc + result.TOTALROOMS, 0)
);

export const selectTopPolicyOffenders = createSelector(
  selectDashboardReport,
  (state: DashboardState) =>
    state.topPolicyOffenders ? state.topPolicyOffenders.fieldValues : null
);

export const selectHotelsIsLoading = createSelector(
  selectDashboardLoadings,
  loadings => loadings.topHotels
);

export const selectUsersIsLoading = createSelector(
  selectDashboardLoadings,
  loadings => loadings.topBookers
);

export const selectPassengersIsLoading = createSelector(
  selectDashboardLoadings,
  loadings => loadings.topTravelers
);

export const selectDatePoints = createSelector(
  selectReservationVals,
  (reservations: IReservationValues) => reservations.datePoints
);

export const selectDatePointsFormated = createSelector(
  selectDatePoints,
  (datePoints: string[]) => formatDatePoint(datePoints)
);

export const selectChartsIsLoading = createSelector(
  selectDashboardLoadings,
  loadings => loadings.summary
);

export const selectCurrencies = createSelector(
  selectReservationVals,
  (results: IReservationValues) => results.currencies || []
);

export const selectDashboardDataPoints = createSelector(
  selectResults,
  selectDatePoints,
  selectCurrencies,
  (results: IDashboardData[], datePoints: string[], currencies: string[]) => {
    return {
      totalSpend: getDataPoints(results, datePoints, currencies, 'TOTALSPEND'),
      totalPax: getDataPointsPerCurrency(results, datePoints, 'TOTALPAX'),
      totalReservations: getDataPointsPerCurrency(
        results,
        datePoints,
        'TOTALRESERVATIONS'
      ),
      totalRooms: getDataPointsPerCurrency(results, datePoints, 'TOTALROOMS'),
      averagePerReservation: getDataPoints(
        results,
        datePoints,
        currencies,
        'RESERVATIONAVG'
      ),
      averagePerNight: getDataPoints(
        results,
        datePoints,
        currencies,
        'ROOMAVG'
      ),
    };
  }
);

export const selectTotalSpendSeries = createSelector(
  selectDashboardDataPoints,
  selectDatePointsFormated,
  ({ totalSpend }, datePointsFormated) => {
    const seriesConfig: SeriesOptionsType[] = getSeriesPerCurrency(totalSpend);
    return createAreaChart(datePointsFormated, seriesConfig);
  }
);

export const selectAverageSpendSeries = createSelector(
  selectDashboardDataPoints,
  selectDatePointsFormated,
  ({ averagePerReservation, averagePerNight }, datePointsFormated) => {
    const perReservationSeries = getSeriesPerCurrency(
      averagePerReservation,
      ChartsTranslation.PerBooking
    );
    const perNightSeries = getSeriesPerCurrency(
      averagePerNight,
      ChartsTranslation.PerNight
    );
    const seriesConfig = perReservationSeries.concat(perNightSeries);
    return createAreaChart(datePointsFormated, seriesConfig);
  }
);

export const selectBookingSeries = createSelector(
  selectDashboardDataPoints,
  selectDatePointsFormated,
  ({ totalRooms, totalReservations }, datePointsFormated) => {
    const seriesConfig = getSeries(DashboardConsts.seriesDataOptions.bookings, [
      totalRooms,
      totalReservations,
    ]);
    return createAreaChart(datePointsFormated, seriesConfig);
  }
);

export const selectTravelersSeries = createSelector(
  selectDashboardDataPoints,
  selectDatePointsFormated,
  ({ totalPax }, datePointsFormated) => {
    const seriesConfig = getSeries(
      DashboardConsts.seriesDataOptions.travelers,
      [totalPax]
    );
    return createAreaChart(datePointsFormated, seriesConfig);
  }
);

export const selectComplianceRate = createSelector(
  selectDashboardReport,
  ({ complianceRate }) => {
    // There is a bug on API returning 'NaN'
    return Number(complianceRate) || 0;
  }
);

export const selectIsDashboardLoading = createSelector(
  selectDashboardLoadings,
  loadings => Object.values(loadings).some(loading => !!loading)
);
