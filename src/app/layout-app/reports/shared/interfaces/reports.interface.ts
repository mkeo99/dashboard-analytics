import { DutyOfCareSearch } from '@app/layout-app/shared';

import { ReportDateTypes } from '../models';

export interface EntityColumn {
  headerName: string;
  field: string;
  width?: number;
  minWidth?: number;
  maxWidth?: number;
  suppressSizeToFit?: boolean;
  rowGroup?: boolean;
  headerClass?: string;
  hide?: boolean;
  cellRenderer?: string;
  valueFormatter?: Function;
  formatType?: 'currency' | 'date' | 'capitalize';
  comparatorType?: string;
}

export interface DateRange {
  dateType?: string;
  startDate: string;
  endDate: string;
  minDate?: string;
  maxDate?: string;
}

export interface DateTypeConstraints {
  dateType: ReportDateTypes;
  minDate: string;
  maxDate: string;
}

export enum DateFilterType {
  'booking' = 1,
  'check-in' = 2,
  'check-out' = 3,
}

export interface IComplianceReport {
  rxRef: string;
  checkIn: string;
  nights: number;
  hotel: string;
  city: string;
  booker: string;
  travellers: string;
  booked: Date | string;
  reason: string;
  spend: number;
  averageRoomNightCost: number;
  policyPerPersonPerNight: number;
  altSpend: number;
  overSpend: number;
  currencyCode: string;
}

export interface AvailableReport {
  name: string;
  url: string;
  id: string;
  newReport?: boolean;
}

export interface ClientFieldReport extends AvailableReport {
  queryParams: {
    clientfieldName: string;
  };
}

export interface IReportDate {
  start: Date;
  end: Date;
  label?: string;
}

export interface ReportDates {
  from: string;
  to: string;
}

export interface IReportState {
  request: DutyOfCareSearch;
  result: DutyOfCareData[];
  loading: boolean;
}

export interface IReportPaging {
  pageNumber: number;
  pageSize: number;
  total: number;
}

export interface ReportRequest {
  type: string;
  startDate: Date;
  endDate: Date;
  dateType: string;
  currencyCode: string;
  query?: string;
}

export interface ReportingRequest {
  startDate: string;
  endDate: string;
  pageNumber?: number;
  pageSize?: number;
  groupBy?: string;
  currencyCode?: string;
  dateType?: DateFilterType;
}

export interface ReportingRequestWithMetaData {
  filter: {
    dateFilter: {
      from: string;
      to: string;
      type: DateFilterType;
    };
  };
  settings: {
    currencyCode: string;
  };
  pageSettings: ReportingPagination;
  groupBy: {
    fieldname: string;
  };
}

export interface CustomReportRequest {
  type: string;
  startDate: string;
  endDate: string;
  dateType: string;
  currencyCode?: string;
  clientfieldName?: string;
}

export interface CustomReportResponse {
  clientfieldvalues: string;
  reservationCount: number;
  roomNightCount: number;
  paxCount: number;
  currencyCode: string;
  totalSpend: number;
  avgReservationSpend: number;
  avgRoomNightSpend: number;
  avgPaxRoomNightSpend: number;
  percentSaving: number;
  totalSaving: number;
  altSpend: number;
}

export enum CustomReport {
  type = 'clientfieldvalues',
  dateType = 'createdon',
}

export interface ReportingResponse {
  data: [];
  pagination: ReportingPagination;
  queryReference?: string;
}

export interface ReportingResponseWithMetaData {
  reportMetadata: ReportingPagination;
  fieldsMetadata: FieldMetadata[];
  fieldValues: ReportingFieldValue[];
}

/**
 * @example
 * [{"booker": [{"example.at.mail.com": 2834.45}]}]
 */
export interface ReportingFieldValue {
  [key: string]: number | string | object;
}

export interface ReportingPagination {
  rowCount?: number;
  pageSize: number;
  pageNumber: number;
}

export interface FieldMetadata {
  name: string;
  type: number;
  displayText: string;
  isVisible: boolean;
  order: number;
}

export interface DutyOfCareData {
  ReservationId: number;
  GivenName: string;
  Surname: string;
  CheckInDate: string;
  CheckOutDate: string;
  WebsiteId: number;
  HotelId: number;
  CreatedOn: string;
  HotelName: string;
  HotelPhoneNumber: string;
  HotelLongitude: string;
  HotelLatitude: string;
  HotelCityName: string;
  HotelCountryCode: string;
  HotelCountryName: string;
}

export interface ReportData {
  AltSpend: number;
  AvgRoomNightSpend: number;
  CityName: string;
  ClientNegCurrencyCode: string;
  ClientNegRate: number;
  ClientNegRateConverted: number;
  CountryCode: string;
  CurrencyCode: string;
  CurrencySymbol: string;
  HotelAvgRoomNightSpend: number;
  HotelId: number;
  HotelName: string;
  HotelCountryCode: string;
  HotelRoomNightCount: number;
  HotelTotalSpend: number;
  PaxCount: number;
  PercentSaving: number;
  ReservationCount: number;
  RoomNightCount: number;
  TotalSaving: number;
  TotalSpend: number;
  TotalSpendWherePriceChecked: number;
}

export interface RoomexPayReportData {
  date: string;
  employee: string;
  merchant: string;
  category: string;
  receipt: string;
  notes: string;
  totalSpend: number;
}
