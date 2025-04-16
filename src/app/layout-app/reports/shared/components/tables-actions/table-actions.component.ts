import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

import {
  DatePickerChanges,
  DatePickerDates,
  DatePickerExtras,
  DatePickerLocale,
  DateTypeOption,
  ISelectItem,
} from '@roomex/components';

import { CheckboxOption } from '@app/layout-app/booking/shared';
import { ReportingPagination } from '@reports/shared';

import { ReportDateTypes } from '../../models';

@Component({
  selector: 'rx-table-actions',
  templateUrl: './table-actions.component.html',
  styleUrls: ['./table-actions.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableActionsComponent {
  @Input() showGroupBy = false;
  @Input() form: FormGroup;
  @Input() groupOptions: ISelectItem[];
  @Input() dateTypeOptions?: DateTypeOption[];
  @Input() datePickerLocale: DatePickerLocale;
  @Input() datePickerDates: DatePickerDates;
  @Input() datePickerExtras: DatePickerExtras = {
    opens: 'left',
    drops: 'down',
  };
  @Input() columnsFilter: CheckboxOption[];
  @Input() pagination: ReportingPagination;
  @Output() rowCount: number;
  @Output() changeGroupBy = new EventEmitter();
  @Output() dateRangeSelected = new EventEmitter<DatePickerChanges>();
  @Output() dateTypeSelected = new EventEmitter<string>();
  @Output() columnsFilterChange = new EventEmitter<CheckboxOption[]>();
  @Output() quickFilterChange = new EventEmitter<ReportDateTypes>();
  @Output() exportData = new EventEmitter();
}
