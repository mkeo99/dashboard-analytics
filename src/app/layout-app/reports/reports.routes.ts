import { Routes } from '@angular/router';

import { AppRoutes } from '@core/constants';

import {
  BookerComponent,
  ClientFieldComponent,
  ComplianceComponent,
  DashboardComponent,
  HotelComponent,
  RoomexPayComponent,
  TrainlineComponent,
  TravelerComponent,
} from './containers';
import { ReportsComponent } from './reports.component';

export const REPORTS_ROUTES: Routes = [
  {
    path: '',
    component: ReportsComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'compliance',
        component: ComplianceComponent,
      },
      {
        path: 'bookers',
        component: BookerComponent,
      },
      {
        path: 'traveler',
        component: TravelerComponent,
      },
      {
        path: 'hotels',
        component: HotelComponent,
      },
      {
        path: 'trainline',
        component: TrainlineComponent,
      },
      {
        path: 'roomexPay',
        component: RoomexPayComponent,
      },
      {
        path: 'clientfieldvalues',
        component: ClientFieldComponent,
      },
      {
        path: AppRoutes.ReportDutyofCare,
        loadChildren: () =>
          import('./containers/dutyofcare/duty-of-care.module').then(
            m => m.DutyOfCareModule
          ),
      },
    ],
  },
];
