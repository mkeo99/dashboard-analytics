import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';

import {
  ColDef,
  Column,
  ColumnApi,
  GridApi,
  ProcessHeaderForExportParams,
} from '@ag-grid-community/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subscription } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import {
  DatePickerChanges,
  DatePickerLocale,
  DateTypeOption,
} from '@roomex/components';

import { I18nService } from '@app/core/modules/i18n/i18n.service';
import { LoggingFacade } from '@app/core/modules/logging/state';
import { RouterFacade } from '@app/core/modules/store/router/facades/router.facade';
import { CheckboxOption } from '@app/layout-app/booking/shared';
import {
  NewReportType,
  ReportDateTypes,
  ReportsConsts,
} from '@reports/shared/models';
import { ReportsFacade } from '@reports/state/facades/reports.facade';

@Component({
  selector: 'rx-table-report',
  templateUrl: './table-report.component.html',
  styleUrls: ['./table-report.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableReportComponent implements OnInit, OnChanges, OnDestroy {
  @Input() reportTitle: string;
  @Input() reportType: NewReportType;
  @Input() reportClientFieldName?: string;
  @Input() dateTypeOptions?: DateTypeOption[];

  gridApi: GridApi;
  columnApi: ColumnApi;
  translatedColDef$: Observable<ColDef[]>;
  translatedCheckboxes$: Observable<CheckboxOption[]>;
  currentEndpoint: string;
  gridOptions = ReportsConsts.gridOptions;

  private subscription: Subscription = new Subscription();

  constructor(
    private i18nService: I18nService,
    private translate: TranslateService,
    private loggingFacade: LoggingFacade,
    public reportsFacade: ReportsFacade,
    public routerFacade: RouterFacade
  ) {}

  ngOnInit(): void {
    this.getRowData();
    this.subscription.add(
      this.i18nService
        .getLanguage()
        .subscribe(language => this.translate.use(language))
    );

    this.subscription.add(
      this.reportsFacade.hasSomeColumnVisible$
        .pipe(delay(0)) // Await ag-grid to hide its columns first
        .subscribe((hasSomeColumnVisible: boolean) =>
          this.setNoRowsMessageVisibility(hasSomeColumnVisible)
        )
    );

    this.translatedCheckboxes$ = this.reportsFacade.columnCheckboxes$.pipe(
      map((checkboxOptions: CheckboxOption[]) =>
        checkboxOptions.map((checkboxOption: CheckboxOption) => ({
          ...checkboxOption,
          name: this.translate.instant(checkboxOption.name),
        }))
      )
    );

    this.translatedColDef$ = this.reportsFacade.columnsData$.pipe(
      map(colDefs =>
        colDefs.map((colDef: ColDef) => ({
          ...colDef,
          headerName: this.translate.instant(colDef.headerName as string),
        }))
      )
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.reportClientFieldName &&
      !changes.reportClientFieldName.firstChange
    ) {
      this.getRowData();
    }
  }

  onGridReady(params: { api: GridApi; columnApi: ColumnApi }): void {
    this.gridApi = params.api;
    this.columnApi = params.columnApi;
    this.adjustColumnsSize();
    this.gridApi.addEventListener(
      Column.EVENT_FILTER_CHANGED,
      this.updatePagination.bind(this)
    );
  }

  getRowData() {
    if (this.reportClientFieldName) {
      this.reportsFacade.loadCustomReport(this.reportClientFieldName);
    } else {
      this.reportsFacade.loadEndpoint(this.reportType);
    }
  }

  onPageSizeChanged(itemsPerPage: number) {
    this.gridApi.paginationSetPageSize(itemsPerPage);
    this.gridApi.paginationGoToFirstPage();
  }

  onChangeView(pageNum: number) {
    this.gridApi.paginationGoToPage(pageNum - 1); // ag-grid uses a 0 index
  }

  onExportData() {
    this.gridApi.exportDataAsCsv({
      processHeaderCallback: (params: ProcessHeaderForExportParams): string => {
        return this.translate.instant(
          params.column.getColDef().headerName || ''
        );
      },
      // tslint:disable-next-line:no-any
      processCellCallback: (params: any): string => {
        if (params.column.getColDef().valueFormatter) {
          return params.column.getColDef().valueFormatter(params);
        }
        return params.value;
      },
    });
  }

  onColumnsFilterChange(checkBoxOptions: CheckboxOption[]): void {
    this.reportsFacade.changeColumnsVisibility(checkBoxOptions);
  }

  onQuickFilterChange(filterValue: string): void {
    this.gridApi.setQuickFilter(filterValue);
  }

  onDateRangeSelected(event: DatePickerChanges) {
    this.loggingFacade.reportDateRange(this.reportType, event);
    this.reportsFacade.changeDateRange(event);
  }

  onDateTypeSelected(event: ReportDateTypes) {
    this.reportsFacade.changeDateType(event);
  }

  updatePagination() {
    const rowCount = this.gridApi.paginationGetRowCount();
    const pageSize = this.gridApi.paginationGetPageSize();
    const pageNumber = this.gridApi.paginationGetCurrentPage() + 1; // ag-grid uses a 0 index
    this.reportsFacade.renderPaginationRange({
      rowCount,
      pageSize,
      pageNumber,
    });
  }

  get datePickerLocale$(): Observable<DatePickerLocale> {
    return this.translate
      .get('reports.datePicker')
      .pipe(map((datePickerLocale: DatePickerLocale) => datePickerLocale));
  }

  get localeText$() {
    return this.translate.get('reports.agGridLocalization');
  }

  private setNoRowsMessageVisibility(hasSomeColumnVisible: boolean): void {
    if (!this.gridApi) {
      return;
    }

    if (hasSomeColumnVisible && this.gridApi.getDisplayedRowCount() > 0) {
      this.gridApi.hideOverlay();
    } else {
      this.gridApi.showNoRowsOverlay();
    }

    this.adjustColumnsSize();
  }

  adjustColumnsSize(): void {
    if (this.columnApi.getAllDisplayedColumns().length < 6) {
      this.gridApi.sizeColumnsToFit();
    } else {
      this.columnApi.autoSizeAllColumns();
    }
  }
}
