import { Injectable } from '@angular/core';

import { Actions, Effect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';

import { AuthFacade } from '@app/core/modules/auth/state/facades/auth.facade';
import { CheckboxOption } from '@app/layout-app/booking/shared';
import { ReportingBackend } from '@reports/backend/reporting.backend';
import {
  CustomReportRequest,
  EntityColumn,
  NewReportType,
  ReportingRequest,
  ReportsConsts,
} from '@reports/shared';
import * as fromReportActions from '@reports/state/actions/reports.actions';
import { ReportsFacade } from '@reports/state/facades/reports.facade';

@Injectable()
export class ReportsEffects {
  constructor(
    private actions$: Actions,
    private authFacade: AuthFacade,
    private reportsFacade: ReportsFacade,
    private reportingBackend: ReportingBackend
  ) {}

  @Effect()
  loadComplianceReport$ = this.actions$.pipe(
    ofType<fromReportActions.ComplianceReportApi>(
      fromReportActions.ReportsActionTypes.ComplianceReportApi
    ),
    withLatestFrom(
      this.reportsFacade.reportParams$,
      this.authFacade.reportsCurrency$
    ),
    switchMap(([action, params, currencyCode]) => {
      const reportParams: ReportingRequest = Object.assign(params, {
        currencyCode,
      });
      return this.reportingBackend
        .getReportData(action.payload, reportParams)
        .pipe(
          map(res => new fromReportActions.ComplianceReportApiSucceed(res)),
          catchError(error =>
            of(new fromReportActions.ComplianceReportApiFailed(error))
          )
        );
    })
  );

  @Effect()
  loadEndpoint$ = this.actions$.pipe(
    ofType<fromReportActions.FetchReportsApi>(
      fromReportActions.ReportsActionTypes.FetchReportsApi
    ),
    withLatestFrom(
      this.reportsFacade.reportParams$,
      this.authFacade.reportsCurrency$
    ),
    switchMap(([action, params, currencyCode]) => {
      const reportParams: ReportingRequest = Object.assign(params, {
        currencyCode,
      });
      return this.reportingBackend
        .getReportMetaData(action.payload, reportParams)
        .pipe(
          map(res => new fromReportActions.FetchReportsApiSucceed(res)),
          catchError(error =>
            of(new fromReportActions.FetchReportsApiFailed(error))
          )
        );
    })
  );

  @Effect()
  changeDateRange$ = this.actions$.pipe(
    ofType<fromReportActions.ChangeDateRange>(
      fromReportActions.ReportsActionTypes.ChangeDateRange
    ),
    withLatestFrom(
      this.reportsFacade.endpoint$,
      this.reportsFacade.reportParams$,
      this.authFacade.reportsCurrency$,
      this.reportsFacade.customReportParams$
    ),
    switchMap(([_, endpoint, params, currencyCode, customReportParams]) => {
      if (endpoint.includes(NewReportType.Clientfield)) {
        return this.getCustomReport(customReportParams, currencyCode, endpoint);
      }
      return this.getMetaDataReport(params, currencyCode, endpoint);
    })
  );

  @Effect()
  changeComplianceDateRange$ = this.actions$.pipe(
    ofType<fromReportActions.ChangeComplianceDateRange>(
      fromReportActions.ReportsActionTypes.ChangeComplianceDateRange
    ),
    withLatestFrom(
      this.reportsFacade.endpoint$,
      this.reportsFacade.reportParams$,
      this.authFacade.reportsCurrency$
    ),
    switchMap(([_, endpoint, params, currencyCode]) => {
      const reportParams = Object.assign(params, { currencyCode });
      return this.reportingBackend.getReportData(endpoint, reportParams).pipe(
        map(res => new fromReportActions.ComplianceReportApiSucceed(res)),
        catchError(error =>
          of(new fromReportActions.ComplianceReportApiFailed(error))
        )
      );
    })
  );

  @Effect()
  setColumnDefinitions$ = this.actions$.pipe(
    ofType<
      | fromReportActions.ComplianceReportApiSucceed
      | fromReportActions.FetchReportsApiSucceed
      | fromReportActions.FetchClientFieldReportApiSucceed
    >(
      fromReportActions.ReportsActionTypes.ComplianceReportApiSucceed,
      fromReportActions.ReportsActionTypes.FetchReportsApiSucceed,
      fromReportActions.ReportsActionTypes.FetchClientFieldReportApiSucceed
    ),
    withLatestFrom(this.reportsFacade.endpoint$),
    map(([_, endpoint]) => {
      if (endpoint.includes(NewReportType.Clientfield)) {
        return this.getInitialColumnSettings(NewReportType.Clientfield);
      }
      return this.getInitialColumnSettings(endpoint);
    }),
    switchMap(({ columnDefinitions, columnsCheckboxes }) => [
      new fromReportActions.SetColumnDefinitions(
        columnDefinitions,
        columnsCheckboxes
      ),
    ])
  );

  @Effect()
  updateColumnDefinitions$ = this.actions$.pipe(
    ofType<fromReportActions.ChangeColumnsVisibility>(
      fromReportActions.ReportsActionTypes.ChangeColumnsVisibility
    ),
    withLatestFrom(this.reportsFacade.columnDefinitions$),
    switchMap(([action, columnDefinitions]) => {
      const checkboxes = action.payload;
      const updatedColumnsVisibility = this.getUpdatedColumnsVisibility(
        checkboxes,
        columnDefinitions
      );
      return [
        new fromReportActions.SetColumnDefinitions(
          updatedColumnsVisibility,
          checkboxes
        ),
      ];
    })
  );

  @Effect()
  loadCustomReport$ = this.actions$.pipe(
    ofType<fromReportActions.FetchClientFieldReportApi>(
      fromReportActions.ReportsActionTypes.FetchClientFieldReportApi
    ),
    withLatestFrom(
      this.reportsFacade.customReportParams$,
      this.authFacade.reportsCurrency$,
      this.reportsFacade.endpoint$
    ),
    switchMap(([_, params, currencyCode, endpoint]) => {
      return this.getCustomReport(params, currencyCode, endpoint);
    })
  );

  private getCustomReport(
    params: CustomReportRequest,
    currencyCode: string,
    enpoint: string
  ) {
    const clientField = enpoint.split('=');
    const reportParams: CustomReportRequest = Object.assign(params, {
      currencyCode,
      clientfieldName: clientField[1],
    });
    return this.reportingBackend.getClientFieldReportData(reportParams).pipe(
      map(res => new fromReportActions.FetchClientFieldReportApiSucceed(res)),
      catchError(error =>
        of(new fromReportActions.FetchClientFieldReportApiFailed(error))
      )
    );
  }

  private getMetaDataReport(
    params: ReportingRequest,
    currencyCode: string,
    endpoint: string
  ) {
    const reportParams = Object.assign(params, { currencyCode });
    return this.reportingBackend.getReportMetaData(endpoint, reportParams).pipe(
      map(res => new fromReportActions.FetchReportsApiSucceed(res)),
      catchError(error =>
        of(new fromReportActions.FetchReportsApiFailed(error))
      )
    );
  }

  private getInitialColumnSettings(endpoint: string) {
    const columnDefinitions: EntityColumn[] =
      ReportsConsts.columnDefinitions[endpoint] || [];
    const columnsCheckboxes: CheckboxOption[] = columnDefinitions.map(
      column => ({
        id: column.field,
        name: column.headerName,
        checked: !column.hide,
      })
    );
    return { columnDefinitions, columnsCheckboxes };
  }

  private getUpdatedColumnsVisibility(
    checkboxes: CheckboxOption[],
    columnDefinitions: EntityColumn[]
  ) {
    return columnDefinitions.map((columnDefinition: EntityColumn) => {
      const correspondingCheckbox = checkboxes.find(
        checkbox => checkbox.id === columnDefinition.field
      );
      return {
        ...columnDefinition,
        hide: !!correspondingCheckbox
          ? !correspondingCheckbox.checked
          : columnDefinition.hide,
      };
    });
  }
}
