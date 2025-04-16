import { Component, OnDestroy, OnInit } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { Chart } from 'angular-highcharts';
import { SeriesOptionsType } from 'highcharts';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

import {
  DatePickerChanges,
  DatePickerExtras,
  DatePickerLocale,
} from '@roomex/components';

import { I18nService } from '@app/core/modules/i18n/i18n.service';
import { LoggingFacade } from '@app/core/modules/logging/state/facades/logging.facade';
import { DateTypeOptionsService } from '@app/core/services';
import { ConfigFacade } from '@core/modules/config/state/facades/config.facade';
import { NewReportType } from '@reports/shared';
import { DashboardFacade } from '@reports/state/facades/dashboard.facade';
import { ReportsFacade } from '@reports/state/facades/reports.facade';

@Component({
  selector: 'rx-reports-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  public readonly datePickerExtras: DatePickerExtras = {
    opens: 'left',
    drops: 'down',
  };

  private subscription: Subscription = new Subscription();

  public totalSpendChart$: Observable<
    Chart
  > = this.dashboardFacade.totalSpendSeries$.pipe(
    map(highChartOptions => this.createTranslatedChart(highChartOptions))
  );

  public averageSpendChart$: Observable<
    Chart
  > = this.dashboardFacade.averageSpendSeries$.pipe(
    map(highChartOptions => this.createTranslatedChart(highChartOptions))
  );

  public totalBookingsChart$: Observable<
    Chart
  > = this.dashboardFacade.bookingSeries$.pipe(
    map(highChartOptions => this.createTranslatedChart(highChartOptions))
  );

  public totalTravelersChart$: Observable<
    Chart
  > = this.dashboardFacade.travelersSeries$.pipe(
    map(highChartOptions => this.createTranslatedChart(highChartOptions))
  );

  constructor(
    private i18nService: I18nService,
    private translate: TranslateService,
    private dateTypeOptionsService: DateTypeOptionsService,
    private loggingFacade: LoggingFacade,
    public configFacade: ConfigFacade,
    public dashboardFacade: DashboardFacade,
    public reportsFacade: ReportsFacade
  ) {}

  public ngOnInit() {
    this.subscription.add(
      this.i18nService
        .getLanguage()
        .subscribe(language => this.translate.use(language))
    );

    this.loggingFacade.landedOnReports();
    this.loggingFacade.reportDashboard();
    this.dashboardFacade.fetchDashboard();
    this.dashboardFacade.fetchTopPolicyOffenders();
    this.dashboardFacade.fetchComplianceRate();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  onDateRangeSelected(event: DatePickerChanges) {
    this.loggingFacade.reportDateRange(NewReportType.Dashboard, event);
    this.dashboardFacade.changeDateRange(event);
  }

  get datePickerLocale$(): Observable<DatePickerLocale> {
    return this.translate
      .get('reports.datePicker')
      .pipe(map((datePickerLocale: DatePickerLocale) => datePickerLocale));
  }

  get dateTypeTranslations$() {
    return this.datePickerLocale$.pipe(
      map(datePickerLocale =>
        this.dateTypeOptionsService.dateTypeBooking(datePickerLocale.dateType)
      )
    );
  }

  private createTranslatedChart(highChartOptions: Highcharts.Options): Chart {
    const optionsTranslated: Highcharts.Options = highChartOptions;
    if (optionsTranslated.title && !!optionsTranslated.title.text) {
      optionsTranslated.title.text = this.translate.instant(
        optionsTranslated.title.text
      );
    }

    if (!!optionsTranslated.series && !!optionsTranslated.series.length) {
      optionsTranslated.series = optionsTranslated.series.map(
        (series: SeriesOptionsType) => ({
          ...series,
          name: this.getSeriesNameTranslated(series.name as string),
        })
      );
    }

    return new Chart(optionsTranslated);
  }

  private getSeriesNameTranslated(name: string): string {
    // Captures two groups what comes before the {{currency}} and the "currency" respectively
    const currencyRegex: RegExp = /(.+){{(\w+)}}/;
    const translationParts: RegExpExecArray | null = currencyRegex.exec(name);

    if (!translationParts) {
      return this.translate.instant(name);
    }

    const translationKey: string = translationParts[1];
    const translationParameter: string = translationParts[2];
    return this.translate.instant(translationKey, {
      currency: translationParameter,
    });
  }
}
