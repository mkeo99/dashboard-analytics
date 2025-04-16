import { APP_INITIALIZER, Injectable, Injector } from '@angular/core';

import { combineLatest as observableCombineLatest } from 'rxjs';
import { filter, map, take, tap, withLatestFrom } from 'rxjs/operators';

import { AuthFacade } from '@core/modules/auth/state/facades/auth.facade';
import { EnvironmentConfiguration } from '@core/modules/config/models';
import { ConfigFacade } from '@core/modules/config/state/facades/config.facade';
import { ErrorService } from '@core/modules/error/services/error.service';
import { LoggingFacade } from '@core/modules/logging/state/facades/logging.facade';

@Injectable()
export class AppConfig {
  constructor(
    private authFacade: AuthFacade,
    private configFacade: ConfigFacade,
    private errorService: ErrorService,
    private injector: Injector
  ) {}

  load(): Promise<void> {
    /**
     * Before we can bootstrap angular application we have to make sure the follow steps are executed:
     * 1. load env configuration and auth token from locale storage if exists
     * 2. a.) if user is authenticated load base config and user config
     *    b.) if user is NOT authenticated load only base config
     */
    return new Promise(resolve => {
      const timer = performance.now();
      observableCombineLatest(
        this.configFacade.hasEnvironmentConfigurationHttpCompleted$,
        this.authFacade.hasLoadTokenFromLocaleStorageCompleted$
      )
        .pipe(
          filter(
            ([
              hasEnvironmentConfigurationHttpCompleted,
              hasLoadTokenFromLocaleStorageCompleted,
            ]) =>
              hasEnvironmentConfigurationHttpCompleted &&
              hasLoadTokenFromLocaleStorageCompleted
          ),
          withLatestFrom(
            this.authFacade.isAuthenticated$,
            this.configFacade.environmentConfiguration$,
            this.configFacade.error$
          ),
          map(
            ([{}, isAuthenticated, envConfig, envConfigError]: [
              {},
              boolean,
              EnvironmentConfiguration | null,
              string | null
            ]) => [isAuthenticated, envConfig, envConfigError]
          ),
          take(1)
        )
        .subscribe(
          ([isAuthenticated, envConfig, envConfigError]: [
            boolean,
            EnvironmentConfiguration | null,
            string | null
          ]) => {
            if (envConfigError) {
              return this.handleError(resolve, envConfigError);
            }
            this.configFacade.generateCid();
            /*
             * Initialize logging
             * */
            const loggingFacade = this.injector.get(LoggingFacade);
            if (envConfig && envConfig.authserver.length) {
              loggingFacade.initIntercom(envConfig.intercom);
              loggingFacade.initDatadog(envConfig);
              loggingFacade.initAmplitude(envConfig.amplitude);
            }

            this.configFacade.loadBaseConfiguration();
            this.configFacade.initializeLocale();

            if (!isAuthenticated) {
              this.configFacade.hasBaseConfigurationHttpCompleted$
                .pipe(
                  filter(
                    hasBaseConfigurationHttpCompleted =>
                      hasBaseConfigurationHttpCompleted
                  ),
                  withLatestFrom(this.configFacade.error$),
                  map(([{}, error]: [{}, string | null]) => error),
                  take(1)
                )
                .subscribe(
                  (error: string) => this.handleError(resolve, error),
                  error => this.handleError(resolve, error)
                );
            } else {
              this.authFacade.loadUserConfiguration();

              observableCombineLatest(
                this.configFacade.hasBaseConfigurationHttpCompleted$,
                this.authFacade.hasUserConfigurationHttpCompleted$
              )
                .pipe(
                  filter(
                    ([
                      hasBaseConfigurationHttpCompleted,
                      hasUserConfigurationHttpCompleted,
                    ]: [boolean, boolean]) =>
                      hasBaseConfigurationHttpCompleted &&
                      hasUserConfigurationHttpCompleted
                  ),
                  tap(() => {
                    loggingFacade.fullConfigLoaded({
                      time: performance.now() - timer,
                    });
                  }),
                  withLatestFrom(
                    this.configFacade.error$,
                    this.authFacade.error$
                  ),
                  map(
                    ([{}, baseConfigError, authError]: [
                      {},
                      string | null,
                      string | null
                    ]) => [baseConfigError, authError]
                  ),
                  take(1)
                )
                .subscribe(
                  ([baseConfigError, authError]: [string, string]) =>
                    this.handleError(resolve, baseConfigError || authError),
                  error => this.handleError(resolve, error)
                );
            }
          },
          error => this.handleError(resolve, error)
        );
    });
  }

  private handleError(resolve: Function, error: string | null) {
    if (error) {
      this.errorService.handleError(new Error(error));
    }

    return resolve();
  }
}

// required for AOT
export function loadConfig(config: AppConfig) {
  return () => config.load();
}

export const APP_CONFIG_PROVIDERS = [
  AppConfig,
  {
    provide: APP_INITIALIZER,
    useFactory: loadConfig,
    deps: [AppConfig],
    multi: true,
  },
];
