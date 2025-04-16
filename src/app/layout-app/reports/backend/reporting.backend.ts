import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { HttpService } from '@app/core/services/http.service';
import {
  CustomReportRequest,
  CustomReportResponse,
  DateFilterType,
  DateRange,
  ReportingRequest,
  ReportingRequestWithMetaData,
  ReportingResponse,
  ReportingResponseWithMetaData,
  ReportsConsts,
  TopPolicyOffendersRequest,
} from '@reports/shared';

@Injectable({
  providedIn: 'root',
})
export class ReportingBackend {
  private readonly apiUrl = `${this.httpService.webApiUrl}reporting`; // New reports
  private readonly apiUrlReports = `${this.httpService.webApiUrl}Reports`; // Old reports

  constructor(private http: HttpClient, private httpService: HttpService) {}

  getReportData(
    report: string,
    parameters: ReportingRequest
  ): Observable<ReportingResponse> {
    return this.http.get<ReportingResponse>(`${this.apiUrl}/${report}`, {
      params: this.getReportingParameters(parameters),
    });
  }

  getReportMetaData(
    report: string,
    parameters: ReportingRequest
  ): Observable<ReportingResponseWithMetaData> {
    const formData = this.setRequestWithMetaTags(parameters);
    return this.http.post<ReportingResponseWithMetaData>(
      `${this.apiUrl}/${report}`,
      formData
    );
  }

  getClientFieldReportData(
    parameters: CustomReportRequest
  ): Observable<CustomReportResponse[]> {
    return this.http.get<CustomReportResponse[]>(`${this.apiUrlReports}?`, {
      params: this.getReportingParameters(parameters),
    });
  }

  getTopPolicyOffenders(
    currencyCode: string,
    dateRange: DateRange
  ): Observable<ReportingResponseWithMetaData> {
    const typeSummary = 'topoffenders';
    const formData = this.setTopPolicyOffendersRequest(
      typeSummary,
      currencyCode,
      dateRange
    );
    return this.http.post<ReportingResponseWithMetaData>(
      `${this.apiUrl}/compliance/summary`,
      formData
    );
  }

  getComplianceRate(
    parameters: ReportingRequest
  ): Observable<ReportingResponseWithMetaData> {
    const payload = this.setRequestWithMetaTags(parameters);
    return this.http.post<ReportingResponseWithMetaData>(
      `${this.apiUrl}/compliance/rate`,
      payload
    );
  }

  private getReportingParameters(
    parameters: ReportingRequest | CustomReportRequest
  ): HttpParams {
    let params = new HttpParams();
    for (const key of Object.keys(parameters)) {
      params = params.set(key, parameters[key]);
    }
    return params;
  }

  private setRequestWithMetaTags(
    parameters: ReportingRequest
  ): ReportingRequestWithMetaData {
    return {
      filter: {
        dateFilter: {
          from: parameters.startDate,
          to: parameters.endDate,
          type: parameters.dateType || DateFilterType.booking,
        },
      },
      settings: {
        currencyCode: parameters.currencyCode || '',
      },
      pageSettings: {
        pageNumber: parameters.pageNumber || 1,
        pageSize: parameters.pageSize || 999999999,
      },
      groupBy: {
        fieldname: parameters.groupBy || '',
      },
    };
  }

  private setTopPolicyOffendersRequest(
    typeSummary: string,
    currencyCode: string,
    dateRange: DateRange
  ): TopPolicyOffendersRequest {
    return {
      filter: {
        dateFilter: {
          from: dateRange.startDate,
          to: dateRange.endDate,
          type: dateRange.dateType,
        },
      },
      settings: { currencyCode },
      summaryType: typeSummary,
      summaryBy: [
        ReportsConsts.topOffendersSummaryBy.booker,
        ReportsConsts.topOffendersSummaryBy.city,
        ReportsConsts.topOffendersSummaryBy.hotel,
      ],
    };
  }
}
