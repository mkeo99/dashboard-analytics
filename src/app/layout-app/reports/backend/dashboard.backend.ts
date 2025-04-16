import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { HttpService } from '@app/core/services/http.service';
import {
  DashboardRequest,
  DashboardResponse,
  DashboardSummary,
  ReportData,
  TopCardsType,
} from '@reports/shared';

@Injectable({
  providedIn: 'root',
})
export class DashboardBackend {
  constructor(private http: HttpClient, private httpService: HttpService) {}

  public graphDashboard(
    dashboardRequest: DashboardRequest
  ): Observable<DashboardResponse> {
    let params = new HttpParams();

    for (const key of Object.keys(dashboardRequest)) {
      params = params.set(key, dashboardRequest[key]);
    }
    return this.http
      .get<DashboardResponse>(
        `${this.httpService.webApiUrl}Reports/Dashboard`,
        { params }
      )
      .pipe(
        map((response: DashboardResponse) => ({
          ...response,
          dashboard: this.getDashboardSummaryWithFallback(response.dashboard),
        }))
      );
  }

  public getTopCardByType(
    dashboardRequest: DashboardRequest,
    type: TopCardsType
  ): Observable<ReportData[]> {
    let params = new HttpParams();

    params = params.set('type', type);
    for (const key of Object.keys(dashboardRequest)) {
      params = params.set(key, dashboardRequest[key]);
    }
    return this.http.get<ReportData[]>(`${this.httpService.webApiUrl}Reports`, {
      params,
    });
  }

  private getDashboardSummaryWithFallback(
    dashboardSummary: DashboardSummary
  ): DashboardSummary {
    const { wouldSpend, savingPercent, saving, totalSpend } = dashboardSummary;
    return {
      ...dashboardSummary,
      wouldSpend: wouldSpend || 0,
      savingPercent: savingPercent || 0,
      saving: saving || 0,
      totalSpend: totalSpend || 0,
    };
  }
}
