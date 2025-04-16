import {
  createFeatureSelector,
  createSelector,
  MemoizedSelector,
} from '@ngrx/store';

import { CheckboxOption } from '@app/layout-app/booking/shared';
import {
  CustomReport,
  CustomReportRequest,
  DateFilterType,
  EntityColumn,
  ReportingRequest,
  ReportingResponse,
} from '@reports/shared';

import { ReportsState } from '../reducers/reports.reducer';

export const STORE_NAME = 'Reports';

enum DateRangeAdditionalTime {
  startDate = 'T00:00:00',
  endDate = 'T23:59:59',
}

enum ReportingPagination {
  pageSize = 999999999,
  pageNumber = 1,
}

export const reportsState = createFeatureSelector<ReportsState>(STORE_NAME);

export const selectIsLoading = createSelector(
  reportsState,
  (state: ReportsState) => state.isLoading
);

export const selectIsSideMenuExpanded = createSelector(
  reportsState,
  (state: ReportsState) => state.sideMenuExpanded
);

export const selectIsTribHubExpanded = createSelector(
  reportsState,
  (state: ReportsState) => state.tripHubExpanded
);

export const selectIsCustomMenuExpanded = createSelector(
  reportsState,
  (state: ReportsState) => state.customReportsExpanded
);

export const selectComplianceReportData = createSelector(
  reportsState,
  (state: ReportsState) => state.compliance
);

export const selectCompliancePagination = createSelector(
  selectComplianceReportData,
  (reportData: ReportingResponse) => (reportData ? reportData.pagination : null)
);

export const selectComplianceDateRange = createSelector(
  reportsState,
  (state: ReportsState) => state.dateRange
);

export const selectReportData = createSelector(
  reportsState,
  (state: ReportsState) => state.report
);

export const selectHeaderData = createSelector(
  selectReportData,
  reportData => reportData.fieldsMetadata
);

export const selectCustomReportRowData = createSelector(
  reportsState,
  (state: ReportsState) => state.customReport
);

export const selectRowData = createSelector(
  selectReportData,
  selectCustomReportRowData,
  (reportData, customReportData) =>
    reportData.fieldValues.length ? reportData.fieldValues : customReportData
);

export const selectPagination = createSelector(
  selectReportData,
  selectCustomReportRowData,
  (reportData, customReportData) => {
    if (reportData.reportMetadata) {
      return reportData.reportMetadata;
    }
    return {
      rowCount: customReportData.length,
      pageSize: 1,
      pageNumber: 1,
    };
  }
);

export const selectFiltered = createSelector(
  reportsState,
  (state: ReportsState) => state.filtered
);

export const selectFilteredRowCount = createSelector(
  selectFiltered,
  filtered => filtered.rowCount
);

export const selectFilteredPageNum = createSelector(
  selectFiltered,
  filtered => filtered.pageNumber
);

export const selectError = createSelector(
  reportsState,
  (state: ReportsState) => state.error
);

export const selectEndpoint = createSelector(
  reportsState,
  (state: ReportsState) => state.endpoint || ''
);

export const selectDateRange = createSelector(
  reportsState,
  (state: ReportsState) => state.dateRange
);

export const selectGroupBy = createSelector(
  reportsState,
  (state: ReportsState) => state.groupBy
);

export const selectReportParams: MemoizedSelector<
  ReportsState,
  ReportingRequest
> = createSelector(
  reportsState,
  ({ dateRange, groupBy }) => ({
    groupBy,
    startDate: dateRange.startDate + DateRangeAdditionalTime.startDate,
    endDate: dateRange.endDate + DateRangeAdditionalTime.endDate,
    dateType: dateRange.dateType
      ? DateFilterType[dateRange.dateType]
      : DateFilterType.booking,
    pageNumber: ReportingPagination.pageNumber,
    pageSize: ReportingPagination.pageSize,
  })
);

export const selectCustomReportParams: MemoizedSelector<
  ReportsState,
  CustomReportRequest
> = createSelector(
  reportsState,
  ({ dateRange }) => ({
    type: CustomReport.type,
    startDate: dateRange.startDate,
    endDate: dateRange.endDate,
    dateType: CustomReport.dateType,
  })
);

export const selectColumnDefinitions: MemoizedSelector<
  ReportsState,
  EntityColumn[]
> = createSelector(
  reportsState,
  (state: ReportsState) => state.columnDefinitions
);

export const selectColumnsCheckboxes: MemoizedSelector<
  ReportsState,
  CheckboxOption[]
> = createSelector(
  reportsState,
  (state: ReportsState) => state.columnsCheckboxes
);

export const selectHasSomeColumnVisible: MemoizedSelector<
  ReportsState,
  boolean
> = createSelector(
  selectColumnDefinitions,
  (columns: EntityColumn[]) => columns.some(column => !column.hide)
);
