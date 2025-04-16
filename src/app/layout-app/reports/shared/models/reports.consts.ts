import { GridOptions } from '@ag-grid-community/core';
import { addYears, format, subDays } from 'date-fns';

import { DateTypeOption } from '@roomex/components';

import { ISO_DATE_FORMAT } from '@app/core/constants/date';
import { AvailableReportType } from '@app/core/modules/auth/models';
import {
  CustomAgGridHeaderComponent,
  CustomNoRowsOverlayComponent,
  ModalLinkRendererComponent,
  ModalNoteComponent,
  ModalReceiptComponent,
} from '@reports/shared/components/ag-grid';
import { AvailableReport } from '@reports/shared/interfaces/reports.interface';
import {
  BookerHeadersTranslation,
  ClientFieldHeadersTranslation,
  ComplianceHeadersTranslation,
  HotelHeadersTranslation,
  NewReportType,
  ReportDateTypes,
  ReportNameTranslation,
  RoomexPayHeadersTranslation,
  TrainlineHeadersTranslation,
  TravelerHeadersTranslation,
} from '@reports/shared/models/report.type';

export class ReportsConsts {
  public static gridOptions: GridOptions = {
    defaultColDef: {
      sortable: true,
      resizable: true,
      minWidth: 120,
      maxWidth: 220,
      filter: true,
      filterParams: {
        suppressMiniFilter: false,
        resetButton: true,
      },
      menuTabs: ['filterMenuTab'],
    },
    pagination: true,
    paginationPageSize: 20,
    suppressPaginationPanel: true,
    animateRows: true,
    sortingOrder: ['desc', 'asc'],
    frameworkComponents: {
      modalLinkRenderer: ModalLinkRendererComponent,
      agColumnHeader: CustomAgGridHeaderComponent,
      customNoRowsOverlay: CustomNoRowsOverlayComponent,
      modalReceipt: ModalReceiptComponent,
      modalNote: ModalNoteComponent,
    },
    rowHeight: 44,
    headerHeight: 44,
    noRowsOverlayComponent: 'customNoRowsOverlay',
  };

  public static gridOptionsDutyOfCare: GridOptions = {
    defaultColDef: {
      sortable: false,
      resizable: true,
      minWidth: 120,
      filter: false,
    },
    frameworkComponents: {
      agColumnHeader: CustomAgGridHeaderComponent,
      customNoRowsOverlay: CustomNoRowsOverlayComponent,
    },
    pagination: false,
    suppressPaginationPanel: true,
    animateRows: true,
    rowHeight: 44,
    headerHeight: 44,
    noRowsOverlayComponent: 'customNoRowsOverlay',
  };

  public static readonly dates = {
    initialStartDate: format(subDays(new Date(), 30), ISO_DATE_FORMAT),
    initialEndDate: format(new Date(), ISO_DATE_FORMAT),
    minDate: '2012-01-01',
    bookingMaxDate: format(new Date(), ISO_DATE_FORMAT),
    checkInAndOutMaxDate: format(addYears(new Date(), 1), ISO_DATE_FORMAT),
  };

  public static readonly topOffendersSummaryBy = {
    booker: 'booker',
    city: 'city',
    hotel: 'hotel',
  };

  public static readonly oldReportsConfig: AvailableReport[] = [
    {
      name: ReportNameTranslation.hotel,
      url: 'hotels',
      id: AvailableReportType.Hotel,
    },
    {
      name: ReportNameTranslation.user,
      url: 'users',
      id: AvailableReportType.User,
    },
    {
      name: ReportNameTranslation.passenger,
      url: 'passengernames',
      id: AvailableReportType.Passenger,
    },
    {
      name: ReportNameTranslation.division,
      url: 'topdivisions',
      id: AvailableReportType.Division,
    },
    {
      name: ReportNameTranslation.reservation,
      url: 'reservations',
      id: AvailableReportType.Reservation,
    },
    {
      name: ReportNameTranslation.outOfPolicy,
      url: 'Report_OutOfPolicy',
      id: AvailableReportType.OutOfPolicy,
    },
  ];

  public static readonly newReportsConfig: AvailableReport[] = [
    {
      name: ReportNameTranslation.hotel,
      url: `/analytics/${NewReportType.Hotels}`,
      id: AvailableReportType.Hotel,
    },
    {
      name: ReportNameTranslation.bookers,
      url: `/analytics/${NewReportType.Bookers}`,
      id: NewReportType.Bookers,
    },
    {
      name: ReportNameTranslation.traveler,
      url: `/analytics/${NewReportType.Traveler}`,
      id: NewReportType.Traveler,
    },
    {
      name: ReportNameTranslation.trainline,
      url: `/analytics/${NewReportType.Trainline}`,
      id: NewReportType.Trainline,
    },
    {
      name: ReportNameTranslation.roomexPay,
      url: `/analytics/${NewReportType.RoomexPay}`,
      id: NewReportType.RoomexPay,
    },
  ];

  // Deprecated header
  public static readonly columnHeaders = {
    dutyofcare: [
      { field: 'Surname', header: 'reports.dutyofcare.columns.name' },
      { field: 'HotelName', header: 'reports.dutyofcare.columns.hotelname' },
      { field: 'HotelCityName', header: 'reports.dutyofcare.columns.location' },
      {
        field: 'CheckInDate',
        header: 'reports.dutyofcare.columns.checkin',
        formatType: 'date',
      },
      {
        field: 'CheckOutDate',
        header: 'reports.dutyofcare.columns.checkout',
        formatType: 'date',
      },
      {
        field: 'HotelPhoneNumber',
        header: 'reports.dutyofcare.columns.phoneNumber',
      },
    ],
  };

  public static dateTypes: DateTypeOption[] = [
    { key: ReportDateTypes.Booking, name: 'Booking' },
    { key: ReportDateTypes.CheckIn, name: 'Check-in' },
    { key: ReportDateTypes.CheckOut, name: 'Check-out' },
  ];

  public static dateTypeBooking: DateTypeOption[] = [
    { key: ReportDateTypes.Booking, name: 'Booking' },
  ];

  public static dateTypeCheckIn: DateTypeOption[] = [
    { key: ReportDateTypes.CheckIn, name: 'Check-in' },
  ];

  public static columnDefinitions = {
    [NewReportType.Compliance]: [
      {
        headerName: ComplianceHeadersTranslation.reservationReference,
        field: 'reservationReference',
        hide: false,
        width: 160,
      },
      {
        headerName: ComplianceHeadersTranslation.checkInDate,
        field: 'checkInDate',
        hide: false,
        formatType: 'date',
        width: 160,
      },
      {
        headerName: ComplianceHeadersTranslation.nights,
        field: 'nights',
        hide: false,
        width: 120,
      },
      {
        headerName: ComplianceHeadersTranslation.hotel,
        field: 'hotel',
        hide: false,
        maxWidth: 260,
      },
      {
        headerName: ComplianceHeadersTranslation.city,
        field: 'city',
        hide: false,
        width: 160,
      },
      {
        headerName: ComplianceHeadersTranslation.booker,
        field: 'booker',
        hide: false,
        width: 220,
      },
      {
        headerName: ComplianceHeadersTranslation.travellers,
        field: 'travellers',
        hide: false,
        width: 220,
        comparatorType: 'caseInsensitive',
      },
      {
        headerName: ComplianceHeadersTranslation.bookedDate,
        field: 'bookedDate',
        hide: false,
        formatType: 'date',
        width: 160,
      },
      {
        headerName: ComplianceHeadersTranslation.reason,
        field: 'reason',
        hide: false,
        comparatorType: 'caseInsensitive',
        maxWidth: 260,
      },
      {
        headerName: ComplianceHeadersTranslation.spend,
        field: 'spend',
        hide: false,
        formatType: 'currency',
        width: 120,
      },
      {
        headerName: ComplianceHeadersTranslation.averageRoomNightCost,
        field: 'averageRoomNightCost',
        hide: true,
        formatType: 'currency',
        width: 240,
      },
      {
        headerName: ComplianceHeadersTranslation.policyPerPersonPerNight,
        field: 'policyPerPersonPerNight',
        hide: false,
        formatType: 'currency',
        maxWidth: 250,
      },
      {
        headerName: ComplianceHeadersTranslation.withinPolicySpend,
        field: 'withinPolicySpend',
        hide: true,
        formatType: 'currency',
        width: 220,
      },
      {
        headerName: ComplianceHeadersTranslation.overSpend,
        field: 'overSpend',
        hide: false,
        formatType: 'currency',
        width: 150,
      },
      {
        headerName: ComplianceHeadersTranslation.numberOfRooms,
        field: 'numberOfRooms',
        hide: true,
        width: 200,
      },
    ],
    [NewReportType.Traveler]: [
      {
        headerName: TravelerHeadersTranslation.travelerName,
        field: 'travelerName',
        hide: false,
        maxWidth: 260,
      },
      {
        headerName: TravelerHeadersTranslation.bookingsCount,
        field: 'bookingsCount',
        hide: false,
      },
      {
        headerName: TravelerHeadersTranslation.nightsCount,
        field: 'nightsCount',
        hide: false,
      },
      {
        headerName: TravelerHeadersTranslation.totalSpend,
        field: 'totalSpend',
        hide: false,
        formatType: 'currency',
      },
      {
        headerName: TravelerHeadersTranslation.totalSavings,
        field: 'totalSavings',
        hide: false,
        formatType: 'currency',
      },
      {
        headerName: TravelerHeadersTranslation.averageRoomNightCost,
        field: 'averageRoomNightCost',
        hide: false,
        formatType: 'currency',
      },
    ],
    [NewReportType.Hotels]: [
      {
        headerName: HotelHeadersTranslation.hotelName,
        field: 'hotelName',
        hide: false,
      },
      {
        headerName: HotelHeadersTranslation.city,
        field: 'city',
        hide: false,
      },
      {
        headerName: HotelHeadersTranslation.country,
        field: 'country',
        hide: false,
      },
      {
        headerName: HotelHeadersTranslation.bookingsCount,
        field: 'bookingsCount',
        hide: false,
      },
      {
        headerName: HotelHeadersTranslation.nightsCount,
        field: 'nightsCount',
        hide: false,
      },
      {
        headerName: HotelHeadersTranslation.totalSpend,
        field: 'totalSpend',
        hide: false,
        formatType: 'currency',
      },
      {
        headerName: HotelHeadersTranslation.averageRoomNightCost,
        field: 'averageRoomNightCost',
        hide: false,
        formatType: 'currency',
      },
      {
        headerName: HotelHeadersTranslation.savings,
        field: 'savings',
        hide: false,
        formatType: 'currency',
      },
    ],
    [NewReportType.Bookers]: [
      {
        headerName: BookerHeadersTranslation.username,
        field: 'username',
        hide: false,
      },
      {
        headerName: BookerHeadersTranslation.lastBookedAt,
        field: 'lastBookedAt',
        hide: false,
        formatType: 'date',
      },
      {
        headerName: BookerHeadersTranslation.bookingsCount,
        field: 'bookingsCount',
        hide: false,
        width: 120,
      },
      {
        headerName: BookerHeadersTranslation.nightsCount,
        field: 'nightsCount',
        hide: false,
        width: 150,
      },
      {
        headerName: BookerHeadersTranslation.travelersCount,
        field: 'travelersCount',
        hide: false,
        width: 120,
      },
      {
        headerName: BookerHeadersTranslation.totalSpend,
        field: 'totalSpend',
        hide: false,
        formatType: 'currency',
        width: 120,
      },
      {
        headerName: BookerHeadersTranslation.totalSavings,
        field: 'totalSavings',
        hide: false,
        formatType: 'currency',
        width: 120,
      },
      {
        headerName: BookerHeadersTranslation.averageRoomNightCost,
        field: 'averageRoomNightCost',
        hide: false,
        formatType: 'currency',
        mindWidth: 220,
      },
    ],
    [NewReportType.Clientfield]: [
      {
        headerName: ClientFieldHeadersTranslation.clientFieldValue,
        field: 'ClientFieldValue',
        hide: false,
      },
      {
        headerName: ClientFieldHeadersTranslation.reservationCount,
        field: 'ReservationCount',
        hide: false,
      },
      {
        headerName: ClientFieldHeadersTranslation.paxCount,
        field: 'PaxCount',
        hide: false,
      },
      {
        headerName: ClientFieldHeadersTranslation.roomNightCount,
        field: 'RoomNightCount',
        hide: false,
      },
      {
        headerName: ClientFieldHeadersTranslation.avgReservationSpend,
        field: 'AvgReservationSpend',
        hide: false,
        formatType: 'currency',
      },
      {
        headerName: ClientFieldHeadersTranslation.totalSpend,
        field: 'TotalSpend',
        hide: false,
        formatType: 'currency',
      },
      {
        headerName: ClientFieldHeadersTranslation.avgRoomNightSpend,
        field: 'AvgRoomNightSpend',
        hide: false,
        formatType: 'currency',
      },
      {
        headerName: ClientFieldHeadersTranslation.totalSaving,
        field: 'TotalSaving',
        hide: false,
        formatType: 'currency',
        width: 120,
      },
    ],
    [NewReportType.Trainline]: [
      {
        headerName: TrainlineHeadersTranslation.transactionId,
        field: 'transactionId',
        hide: false,
        minWidth: 80,
      },
      {
        headerName: TrainlineHeadersTranslation.bookingDate,
        field: 'bookingDate',
        hide: false,
        formatType: 'date',
        minWidth: 80,
      },
      {
        headerName: TrainlineHeadersTranslation.departureDate,
        field: 'departureDate',
        hide: false,
        formatType: 'date',
      },
      {
        headerName: TrainlineHeadersTranslation.bookerName,
        field: 'bookerName',
        hide: false,
        formatType: 'capitalize',
      },
      {
        headerName: TrainlineHeadersTranslation.ticketType,
        field: 'ticketType',
        hide: false,
      },
      {
        headerName: TrainlineHeadersTranslation.originStationName,
        field: 'originStationName',
        hide: false,
        formatType: 'capitalize',
        minWidth: 160,
      },
      {
        headerName: TrainlineHeadersTranslation.destinationStationName,
        field: 'destinationStationName',
        hide: false,
        formatType: 'capitalize',
        minWidth: 160,
      },
      {
        headerName: TrainlineHeadersTranslation.travelers,
        field: 'travelers',
        hide: false,
        formatType: 'capitalize',
        minWidth: 220,
      },
      {
        headerName: TrainlineHeadersTranslation.totalCost,
        field: 'totalCost',
        hide: false,
        formatType: 'currency',
      },
      {
        headerName: TrainlineHeadersTranslation.returnDate,
        field: 'returnDate',
        hide: false,
        formatType: 'date',
      },
    ],
    [NewReportType.RoomexPay]: [
      {
        headerName: RoomexPayHeadersTranslation.date,
        field: 'date',
        hide: false,
        formatType: 'date',
      },
      {
        headerName: RoomexPayHeadersTranslation.employee,
        field: 'employee',
        hide: false,
      },
      {
        headerName: RoomexPayHeadersTranslation.merchant,
        field: 'merchant',
        hide: false,
      },
      {
        headerName: RoomexPayHeadersTranslation.category,
        field: 'category',
        hide: false,
      },
      {
        headerName: RoomexPayHeadersTranslation.receipt,
        field: 'receipt',
        hide: false,
        cellRenderer: 'modalReceipt',
      },
      {
        headerName: RoomexPayHeadersTranslation.notes,
        field: 'notes',
        hide: false,
        cellRenderer: 'modalNote',
      },
      {
        headerName: RoomexPayHeadersTranslation.totalSpend,
        field: 'totalSpend',
        hide: false,
        formatType: 'currency',
      },
    ],
  };
}
