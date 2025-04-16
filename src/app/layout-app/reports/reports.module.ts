import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AgGridModule } from '@ag-grid-community/angular';
import { LicenseManager } from '@ag-grid-enterprise/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ChartModule } from 'angular-highcharts';

import { I18nBackend } from '@core/modules/i18n/i18n.backend';
import {
  CardLeaderboardComponent,
  CardListComponent,
  ChartCardComponent,
  CheckboxesDropdownComponent,
  DashboardChartsComponent,
  HeadlinesComponent,
  TableActionsComponent,
  TableGhostComponent,
  TableReportComponent,
} from '@reports/shared/components';
import { SharedModule } from '@shared/shared.module';

import { RichDropdownModule } from '../shared';
import { ReportsNavigationModule } from '../shared/components/navigation/navigation.module';
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
import { REPORTS_ROUTES } from './reports.routes';
import {
  CustomAgGridHeaderComponent,
  CustomNoRowsOverlayComponent,
  ModalLinkRendererComponent,
  ModalNoteComponent,
  ModalReceiptComponent,
  QuickFilterModule,
  RoomexPayModalModule,
} from './shared/components/ag-grid';
import { StartFromModule } from './shared/pipes/startFrom/start-from.module';
import { DashboardEffects } from './state/effects/dashboard.effects';
import { ReportsEffects } from './state/effects/reports.effects';
import { reportsReducer } from './state/reducers/reports.reducer';
import { STORE_NAME as ReportsStore } from './state/selectors/reports.selectors';

export function createTranslateLoader(handler: I18nBackend) {
  return new TranslateHttpLoader(
    new HttpClient(handler),
    './assets/i18n/layout-app/reports/',
    '.json'
  );
}

// tslint:disable-next-line: max-line-length
const agGridEnterpriseLicence =
  'Roomex_Limited_ROOMEX_Single_Application_1_Devs_1_Deployment_License_5_December_2020_[v2]_MTYwNzEyNjQwMDAwMA==3aabb0747027357e3811f555f4e73285';
LicenseManager.setLicenseKey(agGridEnterpriseLicence); // ag-grid enterprise licence

@NgModule({
  declarations: [
    ReportsComponent,
    ComplianceComponent,
    TableGhostComponent,
    TableActionsComponent,
    TableReportComponent,
    CheckboxesDropdownComponent,
    ModalLinkRendererComponent,

    TravelerComponent,
    RoomexPayComponent,
    HotelComponent,
    BookerComponent,
    DashboardComponent,
    CardListComponent,
    CardLeaderboardComponent,
    HeadlinesComponent,
    ChartCardComponent,
    DashboardChartsComponent,
    CustomAgGridHeaderComponent,
    CustomNoRowsOverlayComponent,
    ClientFieldComponent,
    TrainlineComponent,
  ],
  imports: [
    // angular modules
    FormsModule,

    // third party modules
    AgGridModule.withComponents([
      ModalLinkRendererComponent,
      CustomAgGridHeaderComponent,
      CustomNoRowsOverlayComponent,
      ModalReceiptComponent,
      ModalNoteComponent,
    ]),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [I18nBackend],
      },
      isolate: true,
    }),

    // app modules
    RouterModule.forChild(REPORTS_ROUTES),
    StoreModule.forFeature(ReportsStore, reportsReducer),
    EffectsModule.forFeature([ReportsEffects, DashboardEffects]),
    SharedModule,
    ChartModule,
    ReportsNavigationModule,
    RichDropdownModule,
    StartFromModule,
    QuickFilterModule,
    RoomexPayModalModule,
  ],
})
export class ReportsModule {}
