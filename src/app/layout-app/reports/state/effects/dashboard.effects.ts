import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import {
  catchError,
  filter,
  map,
  mergeMap,
  switchMap,
  withLatestFrom,
} from 'rxjs/operators';

import { UserConfiguration } from '@app/core/modules/auth/models';
import { AuthFacade } from '@app/core/modules/auth/state/facades/auth.facade';
import { ReportingBackend } from '@reports/backend/reporting.backend';
import { DashboardRequest, DateRange, ReportingRequest } from '@reports/shared';
import { DashboardFacade } from '@reports/state/facades/dashboard.facade';
import { ReportsFacade } from '@reports/state/facades/reports.facade';

import { DashboardBackend } from '../../backend/dashboard.backend';
import {
  DashboardActionTypes,
  FetchComplianceRateFailed,
  FetchComplianceRateSucceed,
  FetchDashboardSummary,
  FetchDashboardSummaryFailed,
  FetchDashboardSummarySucceed,
  FetchDashboardTopBookers,
  FetchDashboardTopBookersFailed,
  FetchDashboardTopBookersSucceed,
  FetchDashboardTopHotels,
  FetchDashboardTopHotelsFailed,
  FetchDashboardTopHotelsSucceed,
  FetchDashboardTopTravelers,
  FetchDashboardTopTravelersFailed,
  FetchDashboardTopTravelersSucceed,
  FetchTopPolicyOffendersFailed,
  FetchTopPolicyOffendersSucceed,
} from '../actions/dashboard.actions';

@Injectable()
export class DashboardEffects {
  constructor(
    private actions$: Actions,
    private authFacade: AuthFacade,
    private dashboardFacade: DashboardFacade,
    private reportsFacade: ReportsFacade,
    private reportingBackend: ReportingBackend,
    private dashboardBackend: DashboardBackend
  ) {}

  @Effect()
  fetchDashboard$ = this.actions$.pipe(
    ofType(
      DashboardActionTypes.FetchDashboardReports,
      DashboardActionTypes.ChangeDashboardDateRange
    ),
    withLatestFrom(
      this.authFacade.userConfiguration$,
      this.dashboardFacade.dateRange$
    ),
    map(([_, userConfiguration, dateRange]) =>
      this.getDashboardApiPayload(userConfiguration, dateRange)
    ),
    mergeMap(userConfiguration => [
      new FetchDashboardSummary(userConfiguration),
      new FetchDashboardTopHotels(userConfiguration),
      new FetchDashboardTopBookers(userConfiguration),
      new FetchDashboardTopTravelers(userConfiguration),
    ])
  );

  @Effect()
  fetchDashboardSummary$ = this.actions$.pipe(
    ofType<FetchDashboardSummary>(DashboardActionTypes.FetchDashboardSummary),
    switchMap(({ payload }) =>
      this.dashboardBackend.graphDashboard(payload).pipe(
        map(res => new FetchDashboardSummarySucceed(res)),
        catchError(error => of(new FetchDashboardSummaryFailed(error)))
      )
    )
  );

  @Effect()
  fetchDashboardTopTravelers$ = this.actions$.pipe(
    ofType<FetchDashboardTopTravelers>(
      DashboardActionTypes.FetchDashboardTopTravelers
    ),
    switchMap(({ payload: userConfig }) =>
      this.dashboardBackend.getTopCardByType(userConfig, 'toppassengers').pipe(
        map(res => new FetchDashboardTopTravelersSucceed(res)),
        catchError(error => of(new FetchDashboardTopTravelersFailed(error)))
      )
    )
  );

  @Effect()
  fetchDashboardTopHotels$ = this.actions$.pipe(
    ofType<FetchDashboardTopHotels>(
      DashboardActionTypes.FetchDashboardTopHotels
    ),
    switchMap(({ payload: userConfig }) =>
      this.dashboardBackend.getTopCardByType(userConfig, 'tophotels').pipe(
        map(res => new FetchDashboardTopHotelsSucceed(res)),
        catchError(error => of(new FetchDashboardTopHotelsFailed(error)))
      )
    )
  );

  @Effect()
  fetchDashboardTopBookers$ = this.actions$.pipe(
    ofType<FetchDashboardTopBookers>(
      DashboardActionTypes.FetchDashboardTopBookers
    ),
    switchMap(({ payload: userConfig }) =>
      this.dashboardBackend.getTopCardByType(userConfig, 'topusers').pipe(
        map(res => new FetchDashboardTopBookersSucceed(res)),
        catchError(error => of(new FetchDashboardTopBookersFailed(error)))
      )
    )
  );

  @Effect()
  fetchTopPolicyOffenders$ = this.actions$.pipe(
    ofType(
      DashboardActionTypes.FetchTopPolicyOffenders,
      DashboardActionTypes.ChangeDashboardDateRange
    ),
    withLatestFrom(
      this.reportsFacade.isComplianceReportEnabled$,
      this.authFacade.reportsCurrency$,
      this.dashboardFacade.dateRange$
    ),
    filter(([_, isComplianceReportEnabled]) => !!isComplianceReportEnabled),
    switchMap(([_, _complianceReport, currencyCode, dateRange]) =>
      this.reportingBackend.getTopPolicyOffenders(currencyCode, dateRange).pipe(
        map(res => new FetchTopPolicyOffendersSucceed(res)),
        catchError(error => of(new FetchTopPolicyOffendersFailed(error)))
      )
    )
  );

  @Effect()
  fetchComplianceRate$ = this.actions$.pipe(
    ofType(
      DashboardActionTypes.FetchComplianceRate,
      DashboardActionTypes.ChangeDashboardDateRange
    ),
    withLatestFrom(
      this.reportsFacade.isComplianceReportEnabled$,
      this.authFacade.reportsCurrency$,
      this.dashboardFacade.dateRange$
    ),
    filter(([_, isComplianceReportEnabled]) => !!isComplianceReportEnabled),
    map(
      ([_, __, currencyCode, dateRange]) =>
        ({ ...dateRange, currencyCode } as ReportingRequest)
    ),
    switchMap((reportingRequest: ReportingRequest) =>
      this.reportingBackend.getComplianceRate(reportingRequest).pipe(
        map(res => new FetchComplianceRateSucceed(res)),
        catchError(error => of(new FetchComplianceRateFailed(error)))
      )
    )
  );

  private getDashboardApiPayload(
    userConfig: UserConfiguration,
    dateRange: DateRange
  ): DashboardRequest {
    return {
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      dateType: userConfig.reports.dateType,
      currencyCode: userConfig.reports.currencyCode,
    };
  }
}
