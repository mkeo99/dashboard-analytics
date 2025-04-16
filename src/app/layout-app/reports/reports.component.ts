import { ChangeDetectionStrategy, Component } from '@angular/core';

import { ReportsFacade } from '@reports/state/facades/reports.facade';

@Component({
  selector: 'rx-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ReportsComponent {
  constructor(public reportsFacade: ReportsFacade) {}
}
