import { Component } from '@angular/core';

import { DashboardFacade } from '@app/layout-app/reports/state/facades/dashboard.facade';

@Component({
  selector: 'rx-card-list',
  templateUrl: './card-list.component.html',
})
export class CardListComponent {
  constructor(public dashboardFacade: DashboardFacade) {}
}
