import { Action } from '@ngrx/store';

import { DatePickerChanges } from '@roomex/components';

import {
  DashboardRequest,
  DashboardResponse,
  ReportData,
  ReportingResponseWithMetaData,
} from '@reports/shared';

export enum DashboardActionTypes {
  ChangeDashboardDateRange = '[Dashboard] Change Date Range',

  FetchDashboardReports = '[Dashboard] Fetch Dashboard Reports',

  FetchDashboardSummary = '[Dashboard] Fetch Dashboard Summary',
  FetchDashboardSummarySucceed = '[Dashboard API] Fetch Dashboard Summary Succeed',
  FetchDashboardSummaryFailed = '[Dashboard API] Fetch Dashboard Summary Failed',

  FetchDashboardTopTravelers = '[Dashboard] Fetch Dashboard Top Travelers',
  FetchDashboardTopTravelersSucceed = '[Dashboard API] Fetch Dashboard Top Travelers Succeed',
  FetchDashboardTopTravelersFailed = '[Dashboard API] Fetch Dashboard Top Travelers Failed',

  FetchDashboardTopHotels = '[Dashboard] Fetch Dashboard Top Hotels',
  FetchDashboardTopHotelsSucceed = '[Dashboard API] Fetch Dashboard Top Hotels Succeed',
  FetchDashboardTopHotelsFailed = '[Dashboard API] Fetch Dashboard Top Hotels Failed',

  FetchDashboardTopBookers = '[Dashboard] Fetch Dashboard Top Bookers',
  FetchDashboardTopBookersSucceed = '[Dashboard API] Fetch Dashboard Top Bookers Succeed',
  FetchDashboardTopBookersFailed = '[Dashboard API] Fetch Dashboard Top Bookers Failed',

  FetchTopPolicyOffenders = '[Dashboard] Fetch Top Policy Offenders',
  FetchTopPolicyOffendersSucceed = '[Dashboard API] Fetch Top Policy Offenders Succeed',
  FetchTopPolicyOffendersFailed = '[Dashboard API] Fetch Top Policy Offenders Failed',

  FetchComplianceRate = '[Dashboard] Fetch Compliance Rate',
  FetchComplianceRateSucceed = '[Dashboard API] Fetch Compliance Rate Succeed',
  FetchComplianceRateFailed = '[Dashboard API] Fetch Compliance Rate Failed',
}

export class ChangeDashboardDateRange implements Action {
  readonly type = DashboardActionTypes.ChangeDashboardDateRange;
  constructor(public payload: DatePickerChanges) {}
}

export class FetchDashboardReports implements Action {
  readonly type = DashboardActionTypes.FetchDashboardReports;
  constructor() {}
}

export class FetchDashboardSummary implements Action {
  readonly type = DashboardActionTypes.FetchDashboardSummary;
  constructor(public payload: DashboardRequest) {}
}

export class FetchDashboardSummarySucceed implements Action {
  readonly type = DashboardActionTypes.FetchDashboardSummarySucceed;
  constructor(public payload: DashboardResponse) {}
}

export class FetchDashboardSummaryFailed implements Action {
  readonly type = DashboardActionTypes.FetchDashboardSummaryFailed;
  constructor(public payload: Error) {}
}

export class FetchDashboardTopTravelers implements Action {
  readonly type = DashboardActionTypes.FetchDashboardTopTravelers;
  constructor(public payload: DashboardRequest) {}
}

export class FetchDashboardTopTravelersSucceed implements Action {
  readonly type = DashboardActionTypes.FetchDashboardTopTravelersSucceed;
  constructor(public payload: ReportData[]) {}
}

export class FetchDashboardTopTravelersFailed implements Action {
  readonly type = DashboardActionTypes.FetchDashboardTopTravelersFailed;
  constructor(public payload: Error) {}
}

export class FetchDashboardTopHotels implements Action {
  readonly type = DashboardActionTypes.FetchDashboardTopHotels;
  constructor(public payload: DashboardRequest) {}
}

export class FetchDashboardTopHotelsSucceed implements Action {
  readonly type = DashboardActionTypes.FetchDashboardTopHotelsSucceed;
  constructor(public payload: ReportData[]) {}
}

export class FetchDashboardTopHotelsFailed implements Action {
  readonly type = DashboardActionTypes.FetchDashboardTopHotelsFailed;
  constructor(public payload: Error) {}
}

export class FetchDashboardTopBookers implements Action {
  readonly type = DashboardActionTypes.FetchDashboardTopBookers;
  constructor(public payload: DashboardRequest) {}
}

export class FetchDashboardTopBookersSucceed implements Action {
  readonly type = DashboardActionTypes.FetchDashboardTopBookersSucceed;
  constructor(public payload: ReportData[]) {}
}

export class FetchDashboardTopBookersFailed implements Action {
  readonly type = DashboardActionTypes.FetchDashboardTopBookersFailed;
  constructor(public payload: Error) {}
}

export class FetchTopPolicyOffenders implements Action {
  readonly type = DashboardActionTypes.FetchTopPolicyOffenders;
}

export class FetchTopPolicyOffendersSucceed implements Action {
  readonly type = DashboardActionTypes.FetchTopPolicyOffendersSucceed;
  constructor(public payload: ReportingResponseWithMetaData) {}
}

export class FetchTopPolicyOffendersFailed implements Action {
  readonly type = DashboardActionTypes.FetchTopPolicyOffendersFailed;
  constructor(public payload: Error) {}
}

export class FetchComplianceRate implements Action {
  readonly type = DashboardActionTypes.FetchComplianceRate;
}

export class FetchComplianceRateSucceed implements Action {
  readonly type = DashboardActionTypes.FetchComplianceRateSucceed;
  constructor(public payload: ReportingResponseWithMetaData) {}
}

export class FetchComplianceRateFailed implements Action {
  readonly type = DashboardActionTypes.FetchComplianceRateFailed;
  constructor(public payload: Error) {}
}

export type DashboardActions =
  | ChangeDashboardDateRange
  | FetchDashboardReports
  | FetchDashboardSummary
  | FetchDashboardSummarySucceed
  | FetchDashboardSummaryFailed
  | FetchDashboardTopTravelers
  | FetchDashboardTopTravelersSucceed
  | FetchDashboardTopTravelersFailed
  | FetchDashboardTopHotels
  | FetchDashboardTopHotelsSucceed
  | FetchDashboardTopHotelsFailed
  | FetchDashboardTopBookers
  | FetchDashboardTopBookersSucceed
  | FetchDashboardTopBookersFailed
  | FetchTopPolicyOffenders
  | FetchTopPolicyOffendersSucceed
  | FetchTopPolicyOffendersFailed
  | FetchComplianceRate
  | FetchComplianceRateSucceed
  | FetchComplianceRateFailed;
