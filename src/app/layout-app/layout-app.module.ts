import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { I18nBackend } from '@core/modules/i18n/i18n.backend';
import { SharedModule } from '@shared/shared.module';

import { AccountModule } from './account';
import { AppFooterModule } from './footer/footer.module';
import { AppHeaderModule } from './header/header.module';
import { LayoutAppComponent } from './layout-app.component';
import { LAYOUT_APP_ROUTES } from './layout-app.routes';
import { AppSharedStateModule } from './shared/state/app-shared-state.module';

export function createTranslateLoader(handler: I18nBackend) {
  return new TranslateHttpLoader(
    new HttpClient(handler),
    './assets/i18n/layout-app/',
    '.json'
  );
}

@NgModule({
  declarations: [LayoutAppComponent],
  imports: [
    // angular modules
    RouterModule.forChild(LAYOUT_APP_ROUTES),

    // 3rd party modules
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [I18nBackend],
      },
      isolate: true,
    }),

    // app modules
    SharedModule,
    AppSharedStateModule,
    AppHeaderModule,
    AppFooterModule,
    AccountModule,
  ],
})
export class LayoutAppModule {}
