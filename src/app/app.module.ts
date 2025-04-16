import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppGuardComponent } from '@app/app.guard';
import { CustomPreloadingStrategy } from '@app/app.preloader';
import { APP_ROUTES } from '@app/app.routes';
import { CoreModule } from '@core/core.module';

import { AppComponent } from './app.component';
import { APP_CONFIG_PROVIDERS } from './app.config';
import { IosModalModule } from './shared';

@NgModule({
  declarations: [AppComponent, AppGuardComponent],
  imports: [
    RouterModule.forRoot(APP_ROUTES, {
      preloadingStrategy: CustomPreloadingStrategy,
    }),
    // app modules
    CoreModule,
    IosModalModule,
  ],
  providers: [...APP_CONFIG_PROVIDERS],
  bootstrap: [AppComponent],
})
export class AppModule {}
