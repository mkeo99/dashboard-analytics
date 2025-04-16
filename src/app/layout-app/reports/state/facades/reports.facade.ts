import { Injectable } from '@angular/core';

import { ColDef } from '@ag-grid-community/core';
import { select, Store } from '@ngrx/store';
import format from 'date-fns/format';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { DatePickerChanges } from '@roomex/components';

import { AvailableReportType } from '@app/core/modules/auth/models';
import * as fromAuthSelectors from '@app/core/modules/auth/state/selectors/auth.selectors';
import { NewReportsEnabled } from '@app/core/modules/config/models';
import { selectLocale } from '@app/core/modules/config/state/selectors/config.selectors';
import { CheckboxOption } from '@app/layout-app/booking/shared';
import { DutyOfCareSearch } from '@app/layout-app/shared';
import { ReportsState as OldReportState } from '@app/layout-app/shared/+state/reports.state';
import { ISO_DATE_FORMAT } from '@core/constants';

import {
  AvailableReport,
  ClientFieldReport,
  DateTypeConstraints,
  EntityColumn,
  NewReportType,
  ReportDateTypes,
  ReportingPagination,
  ReportsConsts,
} from '../../shared';
import { getComparator, getFormatter } from '../../shared/utils';
import * as fromReportsActions from '../actions/reports.actions';
import { ReportsState } from '../reducers/reports.reducer';
import * as fromReportsSelectors from '../selectors/reports.selectors';

@Injectable({
  providedIn: 'root',
})
export class ReportsFacade {
  constructor(
    private store: Store<ReportsState>,
    private _state: OldReportState
  ) {}

  isLoading$ = this.store.pipe(select(fromReportsSelectors.selectIsLoading));
  endpoint$ = this.store.pipe(select(fromReportsSelectors.selectEndpoint));
  error$ = this.store.pipe(select(fromReportsSelectors.selectError));
  pagination$ = this.store.pipe(select(fromReportsSelectors.selectPagination));
  dateRange$ = this.store.pipe(select(fromReportsSelectors.selectDateRange));
  filteredRowCount$ = this.store.pipe(
    select(fromReportsSelectors.selectFilteredRowCount)
  );
  filteredPageNum$ = this.store.pipe(
    select(fromReportsSelectors.selectFilteredPageNum)
  );
  compliance$ = this.store.pipe(
    select(fromReportsSelectors.selectComplianceReportData)
  );
  complianceDateRange$ = this.store.pipe(
    select(fromReportsSelectors.selectComplianceDateRange)
  );
  compliancePagination$ = this.store.pipe(
    select(fromReportsSelectors.selectCompliancePagination)
  );
  reportColData$ = this.store.pipe(
    select(fromReportsSelectors.selectHeaderData)
  );
  reportRowData$ = this.store.pipe(select(fromReportsSelectors.selectRowData));
  reportParams$ = this.store.pipe(
    select(fromReportsSelectors.selectReportParams)
  );
  customReportParams$ = this.store.pipe(
    select(fromReportsSelectors.selectCustomReportParams)
  );
  dutyofCare$ = this._state.getReportData();
  dutyofCareIsLoading$ = this.dutyofCare$.pipe(map(report => report.loading));
  dutyofCareHasValues$ = this.dutyofCare$.pipe(
    map(report => report && report.result && report.result.length)
  );
  dutyofCareDates$ = this.dutyofCare$.pipe(
    map(report => ({
      dateType: report.request.dateType,
      minDate: ReportsConsts.dates.minDate,
      maxDate: ReportsConsts.dates.checkInAndOutMaxDate,
      startDate: format(report.request.startDate, ISO_DATE_FORMAT),
      endDate: format(report.request.endDate, ISO_DATE_FORMAT),
    }))
  );
  isTripHubExpanded$ = this.store.pipe(
    select(fromReportsSelectors.selectIsTribHubExpanded)
  );
  isCustomMenuExpanded$ = this.store.pipe(
    select(fromReportsSelectors.selectIsCustomMenuExpanded)
  );
  isSideMenuExpanded$ = this.store.pipe(
    select(fromReportsSelectors.selectIsSideMenuExpanded)
  );

  isComplianceReportEnabled$ = this.showNewReport(
    AvailableReportType.OutOfPolicy
  );

  isRoomexPayReportEnabled$ = this.showNewReport(AvailableReportType.RoomexPay);

  isTravelerReportEnabled$ = this.showNewReport(AvailableReportType.Passenger);

  isHotelReportEnabled$ = this.showNewReport(AvailableReportType.Hotel);

  isBookerReportEnabled$ = this.showNewReport(AvailableReportType.User);

  isTrainlineReportEnabled$ = this.showNewReport(AvailableReportType.Trainline);

  newReportsEnabled$: Observable<NewReportsEnabled> = combineLatest(
    this.isComplianceReportEnabled$,
    this.isTravelerReportEnabled$,
    this.isHotelReportEnabled$,
    this.isBookerReportEnabled$,
    this.isTrainlineReportEnabled$
  ).pipe(
    map(([compliance, traveler, hotel, bookers, trainline]) => ({
      compliance,
      traveler,
      hotel,
      bookers,
      trainline,
    }))
  );

  newReportsConfig$: Observable<
    AvailableReport[]
  > = this.newReportsEnabled$.pipe(
    map((newReports: NewReportsEnabled) => this.getNewReportsConfig(newReports))
  );

  oldReportsConfig$: Observable<AvailableReport[]> = combineLatest(
    this.store.select(fromAuthSelectors.selectAvailableReports),
    this.newReportsEnabled$
  ).pipe(
    map(([oldReports, newReports]) =>
      this.removeOldReportsBasedOnNewReports(oldReports, newReports)
    ),
    map(oldReportsAvailable => this.getOldReportsConfig(oldReportsAvailable))
  );

  clientFieldReportsConfig$: Observable<
    ClientFieldReport[]
  > = this.store.select(fromAuthSelectors.selectClientReportsConfig);

  columnDefinitions$: Observable<EntityColumn[]> = this.store.select(
    fromReportsSelectors.selectColumnDefinitions
  );

  hasSomeColumnVisible$: Observable<boolean> = this.store.select(
    fromReportsSelectors.selectHasSomeColumnVisible
  );

  columnsData$: Observable<ColDef[]> = combineLatest([
    this.store.select(fromReportsSelectors.selectColumnDefinitions),
    this.store.select(fromAuthSelectors.selectReportsCurrency),
    this.store.select(selectLocale),
  ]).pipe(
    map(([columnDefs, currencyCode, locale]) =>
      columnDefs.map((column: EntityColumn) => {
        const valueFormatter = column.formatType
          ? getFormatter(column.formatType, currencyCode, locale)
          : undefined;
        const comparator = column.comparatorType
          ? getComparator(column.comparatorType)
          : undefined;
        return {
          ...column,
          valueFormatter,
          comparator,
        } as ColDef;
      })
    )
  );

  columnCheckboxes$: Observable<CheckboxOption[]> = this.store.select(
    fromReportsSelectors.selectColumnsCheckboxes
  );

  loadReports() {
    this.store.dispatch(new fromReportsActions.LoadReports());
  }

  toggleTripHubMenu() {
    this.store.dispatch(new fromReportsActions.ToggleTripHubMenu());
  }

  toggleCustomMenu() {
    this.store.dispatch(new fromReportsActions.ToggleCustomMenu());
  }

  toggleSideMenu() {
    this.store.dispatch(new fromReportsActions.ToggleSideMenu());
  }

  loadComplianceReport() {
    this.store.dispatch(
      new fromReportsActions.ComplianceReportApi(NewReportType.Compliance)
    );
  }

  loadEndpoint(name: string) {
    this.store.dispatch(new fromReportsActions.FetchReportsApi(name));
  }

  loadCustomReport(clientFieldName: string) {
    this.store.dispatch(
      new fromReportsActions.FetchClientFieldReportApi(clientFieldName)
    );
  }

  loadDutyOfCareReport(searchForm: DutyOfCareSearch) {
    this._state.getReport(searchForm);
  }

  changeDutyOfCareDateRange(datePickerChanges: DatePickerChanges) {
    this._state.getReport({
      dateType: datePickerChanges.dateType,
      startDate: new Date(datePickerChanges.startDate),
      endDate: new Date(datePickerChanges.endDate),
    });
  }

  changeDateRange(datePickerChanges: DatePickerChanges) {
    this.store.dispatch(
      new fromReportsActions.ChangeDateRange(datePickerChanges)
    );
  }

  changeDateType(dateType: ReportDateTypes) {
    this.store.dispatch(
      new fromReportsActions.ChangeDateType(
        this.getDateTypeConstraints(dateType)
      )
    );
  }

  changeComplianceDateRange(datePickerChanges: DatePickerChanges) {
    this.store.dispatch(
      new fromReportsActions.ChangeComplianceDateRange(datePickerChanges)
    );
  }

  changeComplianceDateType(dateType: ReportDateTypes) {
    this.store.dispatch(
      new fromReportsActions.ChangeComplianceDateType(
        this.getDateTypeConstraints(dateType)
      )
    );
  }

  changeColumnsVisibility(checkboxOptions: CheckboxOption[]) {
    this.store.dispatch(
      new fromReportsActions.ChangeColumnsVisibility(checkboxOptions)
    );
  }

  renderPaginationRange(pagination: ReportingPagination) {
    this.store.dispatch(
      new fromReportsActions.RenderPaginationRange(pagination)
    );
  }

  private getDateTypeConstraints(
    dateType: ReportDateTypes
  ): DateTypeConstraints {
    const minDate = ReportsConsts.dates.minDate;
    const maxDate =
      dateType === ReportDateTypes.Booking
        ? ReportsConsts.dates.bookingMaxDate
        : ReportsConsts.dates.checkInAndOutMaxDate;
    return { dateType, minDate, maxDate };
  }

  private showNewReport(
    oldReportType: AvailableReportType
  ): Observable<boolean> {
    const clientReports$ = this.store.select(
      fromAuthSelectors.selectAvailableReports
    );
    return combineLatest(clientReports$).pipe(
      map(([clientReports]) => clientReports.includes(oldReportType))
    );
  }

  private getNewReportsConfig(
    newReportsEnabled: NewReportsEnabled
  ): AvailableReport[] {
    return ReportsConsts.newReportsConfig.filter(
      report => !!newReportsEnabled[report.id]
    );
  }

  private removeOldReportsBasedOnNewReports(
    oldReports: AvailableReportType[],
    newReports: NewReportsEnabled
  ): AvailableReportType[] {
    return oldReports.filter(report => {
      switch (report) {
        case AvailableReportType.Hotel:
          return !newReports.hotel;
        case AvailableReportType.User:
          return !newReports.bookers;
        case AvailableReportType.OutOfPolicy:
          return !newReports.compliance;
        case AvailableReportType.Passenger:
          return !newReports.traveler;
        default:
          return report;
      }
    });
  }

  private getOldReportsConfig(
    oldReports: AvailableReportType[]
  ): AvailableReport[] {
    const oldReportsConfig: AvailableReport[] = oldReports.reduce(
      (accumulator, reportType) => {
        const reportsConfig = ReportsConsts.oldReportsConfig.find(
          config => config.id === reportType
        );
        if (!reportsConfig) {
          return accumulator;
        }
        return [...accumulator, reportsConfig];
      },
      []
    );
    return oldReportsConfig;
  }
}
