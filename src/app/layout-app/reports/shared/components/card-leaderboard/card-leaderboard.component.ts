import { Component, Input } from '@angular/core';

import { ReportingFieldValue, ReportsConsts } from '@reports/shared/';

@Component({
  selector: 'rx-card-leaderboard',
  templateUrl: './card-leaderboard.component.html',
  styleUrls: ['./card-leaderboard.component.scss'],
})
export class CardLeaderboardComponent {
  @Input() topPolicyOffenders: ReportingFieldValue[];
  @Input() currency: string;
  @Input() isLoading: boolean;
  @Input() error: string;

  readonly topOffendersSummaryBy = ReportsConsts.topOffendersSummaryBy;
}
