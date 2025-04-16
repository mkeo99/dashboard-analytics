import { Routes } from '@angular/router';

import { AppRoutes } from '@core/constants/routes';

import { LayoutAppComponent } from './layout-app.component';

export const LAYOUT_APP_ROUTES: Routes = [
  {
    path: '',
    component: LayoutAppComponent,
    children: [
      {
        path: AppRoutes.Analytics,
        loadChildren: () =>
          import('./reports/reports.module').then(m => m.ReportsModule),
      },
    ],
  },
];
