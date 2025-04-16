import { Injectable } from '@angular/core';

import { select, Store } from '@ngrx/store';

import { DatePickerChanges } from '@roomex/components';

import * as fromAuthSelectors from '@app/core/modules/auth/state/selectors/auth.selectors';
import * as fromDashboardActions from '@reports/state/actions/dashboard.actions';
import { DashboardState } from '@reports/state/reducers/reports.reducer';
import * as fromDashboardSelectors from '@reports/state/selectors/dashboard.selectors';
import * as fromReportsSelectors from '@reports/state/selectors/reports.selectors';

@Injectable({
  providedIn: 'root',
})
export class DashboardFacade {
  constructor(private store: Store<DashboardState>) {}

  dateRange$ = this.store.pipe(select(fromReportsSelectors.selectDateRange));
  isDashboardLoading$ = this.store.pipe(
    select(fromDashboardSelectors.selectIsDashboardLoading)
  );
  loadings$ = this.store.pipe(
    select(fromDashboardSelectors.selectDashboardLoadings)
  );
  error$ = this.store.pipe(select(fromReportsSelectors.selectError));
  hotels$ = this.store.pipe(select(fromDashboardSelectors.selectHotels));
  passengers$ = this.store.pipe(
    select(fromDashboardSelectors.selectPassengers)
  );
  users$ = this.store.pipe(select(fromDashboardSelectors.selectUsers));
  currency$ = this.store.pipe(select(fromAuthSelectors.selectReportsCurrency));
  totalSaving$ = this.store.pipe(
    select(fromDashboardSelectors.selectTotalSaving)
  );
  totalSpend$ = this.store.pipe(
    select(fromDashboardSelectors.selectTotalSpend)
  );
  totalRooms$ = this.store.pipe(
    select(fromDashboardSelectors.selectTotalRooms)
  );
  reservationVals$ = this.store.pipe(
    select(fromDashboardSelectors.selectReservationVals)
  );

  hotelsLoading$ = this.store.pipe(
    select(fromDashboardSelectors.selectHotelsIsLoading)
  );
  passengerslsLoading$ = this.store.pipe(
    select(fromDashboardSelectors.selectPassengersIsLoading)
  );
  userslsLoading$ = this.store.pipe(
    select(fromDashboardSelectors.selectUsersIsLoading)
  );
  topPolicyOffenders$ = this.store.pipe(
    select(fromDashboardSelectors.selectTopPolicyOffenders)
  );

  totalSpendSeries$ = this.store.pipe(
    select(fromDashboardSelectors.selectTotalSpendSeries)
  );

  averageSpendSeries$ = this.store.pipe(
    select(fromDashboardSelectors.selectAverageSpendSeries)
  );

  bookingSeries$ = this.store.pipe(
    select(fromDashboardSelectors.selectBookingSeries)
  );

  travelersSeries$ = this.store.pipe(
    select(fromDashboardSelectors.selectTravelersSeries)
  );

  chartsIsLoading$ = this.store.pipe(
    select(fromDashboardSelectors.selectChartsIsLoading)
  );

  complianceRate$ = this.store.pipe(
    select(fromDashboardSelectors.selectComplianceRate)
  );

  changeDateRange(datePickerChanges: DatePickerChanges) {
    this.store.dispatch(
      new fromDashboardActions.ChangeDashboardDateRange(datePickerChanges)
    );
  }

  fetchDashboard() {
    this.store.dispatch(new fromDashboardActions.FetchDashboardReports());
  }

  fetchTopPolicyOffenders() {
    this.store.dispatch(new fromDashboardActions.FetchTopPolicyOffenders());
  }

  fetchComplianceRate() {
    this.store.dispatch(new fromDashboardActions.FetchComplianceRate());
  }
}
