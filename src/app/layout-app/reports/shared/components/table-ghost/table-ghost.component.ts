import { ChangeDetectionStrategy, Component } from '@angular/core';

import {
  ClientSideRowModelModule,
  ClipboardModule,
  ExcelExportModule,
  MenuModule,
  Module,
  SetFilterModule,
} from '@ag-grid-enterprise/all-modules';

@Component({
  selector: 'rx-table-ghost',
  templateUrl: './table-ghost.component.html',
  styleUrls: ['./table-ghost.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableGhostComponent {
  public modules: Module[] = [
    ClientSideRowModelModule,
    ClipboardModule,
    ExcelExportModule,
    MenuModule,
    SetFilterModule,
  ];

  gridOptions = {
    rowHeight: 44,
    headerHeight: 44,
  };
  columnDefs = Array(8).fill({
    headerName: '',
    field: 'data',
    width: 190,
    headerClass: 'loading-cell',
    cellClass: 'loading-cell',
    flex: 1,
  });
  rowData = Array(11).fill({ data: 'loading' });
}
