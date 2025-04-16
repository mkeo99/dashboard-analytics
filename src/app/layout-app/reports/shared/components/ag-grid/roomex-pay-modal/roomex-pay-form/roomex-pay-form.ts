import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { FormUtils } from '@app/core/utils';
import {
  RoomexPayHeadersTranslation,
  RoomexPayReportData,
} from '@app/layout-app/reports/shared';

@Component({
  selector: 'rx-roomex-pay-form',
  templateUrl: './roomex-pay-form.html',
  styleUrls: ['./roomex-pay-form.scss'],
})
export class RoomexPayFormComponent extends FormUtils implements OnInit {
  @Input() rowData: RoomexPayReportData;
  @Input() editMode: Boolean = false;

  public form: FormGroup;
  public roomexPayHeadersTranslation: RoomexPayHeadersTranslation;

  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit(): void {
    const {
      category,
      date,
      employee,
      merchant,
      receipt,
      notes,
      totalSpend,
    } = this.rowData;
    this.form = this.fb.group({
      date: [{ value: date, disabled: this.isDisabled }, Validators.required],
      category: [
        { value: category, disabled: this.isDisabled },
        Validators.required,
      ],
      employee: [
        { value: employee, disabled: this.isDisabled },
        Validators.required,
      ],
      merchant: [
        { value: merchant, disabled: this.isDisabled },
        Validators.required,
      ],
      totalSpend: [
        { value: totalSpend, disabled: this.isDisabled },
        Validators.required,
      ],
      receipt: [{ value: receipt, disabled: this.isDisabled }],
      notes: [
        { value: notes, disabled: this.isDisabled },
        Validators.maxLength(100),
      ],
    });
  }

  onSubmit() {
    if (this.form.invalid) {
      this.markAllAsTouched(this.form);
      return;
    }
  }

  get isDisabled() {
    return !this.editMode;
  }
}
