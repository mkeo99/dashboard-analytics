import { Action } from '@ngrx/store';

import { DatePickerChanges } from '@roomex/components';

import { CheckboxOption } from '@app/layout-app/booking/shared';
import {
  CustomReportResponse,
  DateTypeConstraints,
  EntityColumn,
  ReportingPagination,
  ReportingResponse,
  ReportingResponseWithMetaData,
} from '@reports/shared';

export enum ReportsActionTypes {
  LoadReports = '[Reports] Load Reports',
  LoadReportsSucceed = '[Reports] Load Reports Succeed',
  LoadReportsFailed = '[Reports] Load Reports Failed',
  ToggleCustomMenu = '[Reports] Toggle Custom Menu',
  ToggleTripHubMenu = '[Reports] Toggle Trip Hub Menu',
  ToggleSideMenu = '[Reports] Toggle Side Menu',
  ComplianceReportApi = '[Report] Compliance Report API',
  ComplianceReportApiSucceed = '[Report API] Compliance Report Succeed',
  ComplianceReportApiFailed = '[Report API] Compliance Report Failed',
  ChangeComplianceDateRange = '[Report] Change Compliance Date Range',
  ChangeComplianceDateType = '[Report] Change Compliance Date Type',
  FetchReportsApi = '[Reports] Fetch Reports API',
  FetchReportsApiSucceed = '[Reports API] Fetched Reports Succeed',
  FetchReportsApiFailed = '[Reports API] Fetched Reports Failed',
  ChangeDateRange = '[Reports] Change Date Range',
  ChangeDateType = '[Reports] Change Date Type',
  SetColumnDefinitions = '[Reports] Set Column Definitions',
  ChangeColumnsVisibility = '[Reports] Change Columns Visibility',
  RenderPaginationRange = '[Reports] Render Pagination Range',
  FetchClientFieldReportApi = '[Reports] Fetch Client Field Report',
  FetchClientFieldReportApiSucceed = '[Reports API] Fetch Client Field Report Succeed',
  FetchClientFieldReportApiFailed = '[Reports API] Fetch Client Field Report Failed',
}

export class LoadReports implements Action {
  readonly type = ReportsActionTypes.LoadReports;
}

export class LoadReportsSucceed implements Action {
  readonly type = ReportsActionTypes.LoadReportsSucceed;
  constructor(public payload: string[]) {}
}

export class LoadReportsFailed implements Action {
  readonly type = ReportsActionTypes.LoadReportsFailed;
  constructor(public payload: Error) {}
}

export class ToggleCustomMenu implements Action {
  readonly type = ReportsActionTypes.ToggleCustomMenu;
}

export class ToggleTripHubMenu implements Action {
  readonly type = ReportsActionTypes.ToggleTripHubMenu;
}

export class ToggleSideMenu implements Action {
  readonly type = ReportsActionTypes.ToggleSideMenu;
}

export class ComplianceReportApi implements Action {
  readonly type = ReportsActionTypes.ComplianceReportApi;
  constructor(public payload: string) {}
}

export class ComplianceReportApiSucceed implements Action {
  readonly type = ReportsActionTypes.ComplianceReportApiSucceed;
  constructor(public payload: ReportingResponse) {}
}

export class ComplianceReportApiFailed implements Action {
  readonly type = ReportsActionTypes.ComplianceReportApiFailed;
  constructor(public payload: Error) {}
}

export class ChangeComplianceDateRange implements Action {
  readonly type = ReportsActionTypes.ChangeComplianceDateRange;
  constructor(public payload: DatePickerChanges) {}
}

export class ChangeComplianceDateType implements Action {
  readonly type = ReportsActionTypes.ChangeComplianceDateType;
  constructor(public payload: DateTypeConstraints) {}
}

export class FetchReportsApi implements Action {
  readonly type = ReportsActionTypes.FetchReportsApi;
  constructor(public payload: string) {}
}

export class FetchReportsApiSucceed implements Action {
  readonly type = ReportsActionTypes.FetchReportsApiSucceed;
  constructor(public payload: ReportingResponseWithMetaData) {}
}

export class FetchReportsApiFailed implements Action {
  readonly type = ReportsActionTypes.FetchReportsApiFailed;
  constructor(public payload: Error) {}
}

export class ChangeDateRange implements Action {
  readonly type = ReportsActionTypes.ChangeDateRange;
  constructor(public payload: DatePickerChanges) {}
}

export class ChangeDateType implements Action {
  readonly type = ReportsActionTypes.ChangeDateType;
  constructor(public payload: DateTypeConstraints) {}
}

export class SetColumnDefinitions implements Action {
  readonly type = ReportsActionTypes.SetColumnDefinitions;
  constructor(
    public columnDefinitions: EntityColumn[],
    public columnsCheckboxes: CheckboxOption[]
  ) {}
}

export class ChangeColumnsVisibility implements Action {
  readonly type = ReportsActionTypes.ChangeColumnsVisibility;
  constructor(public payload: CheckboxOption[]) {}
}

export class RenderPaginationRange implements Action {
  readonly type = ReportsActionTypes.RenderPaginationRange;
  constructor(public payload: ReportingPagination) {}
}

export class FetchClientFieldReportApi implements Action {
  readonly type = ReportsActionTypes.FetchClientFieldReportApi;
  constructor(public payload: string) {}
}

export class FetchClientFieldReportApiSucceed implements Action {
  readonly type = ReportsActionTypes.FetchClientFieldReportApiSucceed;
  constructor(public payload: CustomReportResponse[]) {}
}

export class FetchClientFieldReportApiFailed implements Action {
  readonly type = ReportsActionTypes.FetchClientFieldReportApiFailed;
  constructor(public payload: Error) {}
}

export type ReportsActionsUnion =
  | LoadReports
  | LoadReportsSucceed
  | LoadReportsFailed
  | ToggleCustomMenu
  | ToggleTripHubMenu
  | ToggleSideMenu
  | FetchReportsApi
  | FetchReportsApiSucceed
  | FetchReportsApiFailed
  | ChangeDateRange
  | ChangeDateType
  | ComplianceReportApi
  | ComplianceReportApiSucceed
  | ComplianceReportApiFailed
  | ChangeComplianceDateRange
  | ChangeComplianceDateType
  | SetColumnDefinitions
  | ChangeColumnsVisibility
  | RenderPaginationRange
  | FetchClientFieldReportApi
  | FetchClientFieldReportApiSucceed
  | FetchClientFieldReportApiFailed;
