import { CheckboxOption } from '@app/layout-app/booking/shared';
import {
  Clientfield,
  CustomReport,
  CustomReportResponse,
  DashboardResponse,
  DashboardSummary,
  DateRange,
  EntityColumn,
  FieldMetadata,
  IReservationValues,
  ReportData,
  ReportDateTypes,
  ReportingFieldValue,
  ReportingPagination,
  ReportingResponse,
  ReportingResponseWithMetaData,
  ReportsConsts,
} from '@reports/shared';

import {
  DashboardActions,
  DashboardActionTypes,
} from '../actions/dashboard.actions';
import {
  ReportsActionsUnion,
  ReportsActionTypes,
} from '../actions/reports.actions';

export interface DashboardLoadings {
  summary: boolean;
  topHotels: boolean;
  topBookers: boolean;
  topTravelers: boolean;
  topPolicyOffenders: boolean;
  complianceRate: boolean;
}
export interface DashboardState {
  dashboard: DashboardSummary;
  reservationVals: IReservationValues;
  hotels: ReportData[];
  users: ReportData[];
  passengers: ReportData[];
  topPolicyOffenders: ReportingResponseWithMetaData | null;
  complianceRate: number;
  loadings: DashboardLoadings;
}
export interface ReportsState {
  isLoading: boolean;
  error: string | null;
  endpoint: string | null;
  columnDefinitions: EntityColumn[];
  columnsCheckboxes: CheckboxOption[];
  compliance: ReportingResponse | null;
  queryReference?: string;
  tripHubExpanded: boolean;
  customReportsExpanded: boolean;
  sideMenuExpanded: boolean;
  groupBy: string;
  dateRange: DateRange;
  report: {
    reportMetadata: ReportingPagination | null;
    fieldsMetadata: FieldMetadata[];
    fieldValues: ReportingFieldValue[];
  };
  customReport: CustomReportResponse[];
  filtered: ReportingPagination;
  dashboard: DashboardState;
}

const clientfieldvalues = `${CustomReport.type}?${Clientfield.name}=`;

const initialDateRangeState: DateRange = {
  dateType: ReportDateTypes.Booking,
  startDate: ReportsConsts.dates.initialStartDate,
  endDate: ReportsConsts.dates.initialEndDate,
  minDate: ReportsConsts.dates.minDate,
  maxDate: ReportsConsts.dates.bookingMaxDate,
};

const initialDashboardState: DashboardState = {
  dashboard: {
    saving: 0,
    savingPercent: 0,
    totalSpend: 0,
    wouldSpend: 0,
    currency: 'EUR',
  },
  reservationVals: {
    currencies: [],
    datePoints: [],
    results: [],
  },
  hotels: [],
  users: [],
  passengers: [],
  topPolicyOffenders: null,
  complianceRate: 0,
  loadings: {
    summary: true,
    topHotels: true,
    topBookers: true,
    topTravelers: true,
    topPolicyOffenders: true,
    complianceRate: true,
  },
};

export const initialState: ReportsState = {
  isLoading: false,
  error: null,
  endpoint: null,
  columnDefinitions: [],
  columnsCheckboxes: [],
  compliance: null,
  tripHubExpanded: false,
  customReportsExpanded: false,
  sideMenuExpanded: true,
  groupBy: '',
  dateRange: initialDateRangeState,
  report: {
    reportMetadata: null,
    fieldsMetadata: [],
    fieldValues: [],
  },
  customReport: [],
  filtered: {
    rowCount: 0,
    pageSize: 20,
    pageNumber: 1,
  },
  dashboard: initialDashboardState,
};

const getDateStateByVerifyingDateType = (
  currentDateRange: DateRange
): DateRange => {
  return currentDateRange.dateType === ReportDateTypes.Booking
    ? currentDateRange
    : initialDateRangeState;
};

export function reportsReducer(
  state = initialState,
  action: ReportsActionsUnion | DashboardActions
): ReportsState {
  switch (action.type) {
    case ReportsActionTypes.ComplianceReportApi: {
      return {
        ...state,
        dateRange: getDateStateByVerifyingDateType(state.dateRange),
        endpoint: action.payload,
        isLoading: true,
        error: null,
      };
    }

    case ReportsActionTypes.ComplianceReportApiSucceed: {
      return {
        ...state,
        isLoading: false,
        error: null,
        compliance: {
          data: action.payload.data,
          pagination: action.payload.pagination,
        },
      };
    }

    case ReportsActionTypes.ComplianceReportApiFailed: {
      return {
        ...state,
        error: action.payload.message,
        isLoading: false,
      };
    }

    case ReportsActionTypes.ToggleCustomMenu: {
      return {
        ...state,
        customReportsExpanded: !state.customReportsExpanded,
        tripHubExpanded: false,
      };
    }

    case ReportsActionTypes.ToggleTripHubMenu: {
      return {
        ...state,
        tripHubExpanded: !state.tripHubExpanded,
        customReportsExpanded: false,
      };
    }

    case ReportsActionTypes.ToggleSideMenu: {
      return {
        ...state,
        sideMenuExpanded: !state.sideMenuExpanded,
        tripHubExpanded: false,
        customReportsExpanded: false,
      };
    }

    case ReportsActionTypes.FetchReportsApi: {
      return {
        ...state,
        dateRange: state.dateRange,
        endpoint: action.payload,
        isLoading: true,
        error: null,
        tripHubExpanded: true,
        customReportsExpanded: false,
        customReport: [],
      };
    }

    case ReportsActionTypes.FetchReportsApiSucceed: {
      return {
        ...state,
        isLoading: false,
        error: null,
        report: {
          reportMetadata: action.payload.reportMetadata,
          fieldsMetadata: action.payload.fieldsMetadata,
          fieldValues: action.payload.fieldValues,
        },
      };
    }

    case ReportsActionTypes.FetchReportsApiFailed: {
      return {
        ...state,
        error: action.payload.message,
        isLoading: false,
        report: {
          reportMetadata: null,
          fieldsMetadata: [],
          fieldValues: [],
        },
      };
    }

    case ReportsActionTypes.ChangeComplianceDateRange:
    case ReportsActionTypes.ChangeDateRange: {
      return {
        ...state,
        isLoading: true,
        error: null,
        dateRange: {
          dateType: state.dateRange.dateType,
          startDate: action.payload.startDate,
          endDate: action.payload.endDate,
          minDate: ReportsConsts.dates.minDate,
        },
      };
    }

    case ReportsActionTypes.ChangeDateType: {
      return {
        ...state,
        dateRange: {
          ...state.dateRange,
          ...action.payload,
        },
      };
    }

    case ReportsActionTypes.SetColumnDefinitions: {
      return {
        ...state,
        columnDefinitions: action.columnDefinitions,
        columnsCheckboxes: action.columnsCheckboxes,
      };
    }

    case ReportsActionTypes.RenderPaginationRange: {
      return {
        ...state,
        filtered: {
          rowCount: action.payload.rowCount,
          pageSize: action.payload.pageSize,
          pageNumber: action.payload.pageNumber,
        },
      };
    }

    case DashboardActionTypes.FetchDashboardReports: {
      return {
        ...state,
        dateRange: getDateStateByVerifyingDateType(state.dateRange),
        dashboard: {
          ...state.dashboard,
          loadings: {
            ...state.dashboard.loadings,
            summary: true,
            topHotels: true,
            topTravelers: true,
            topBookers: true,
          },
        },
        error: null,
      };
    }

    case DashboardActionTypes.FetchDashboardSummarySucceed: {
      const dashboardResponse: DashboardResponse = action.payload;
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          ...dashboardResponse,
          loadings: {
            ...state.dashboard.loadings,
            summary: false,
          },
        },
      };
    }

    case DashboardActionTypes.FetchDashboardSummaryFailed: {
      return {
        ...state,
        error: action.payload.message,
        dashboard: {
          ...state.dashboard,
          loadings: {
            ...state.dashboard.loadings,
            summary: false,
          },
        },
      };
    }

    case DashboardActionTypes.FetchDashboardTopTravelersSucceed: {
      const passengers: ReportData[] = action.payload;
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          passengers,
          loadings: {
            ...state.dashboard.loadings,
            topTravelers: false,
          },
        },
      };
    }

    case DashboardActionTypes.FetchDashboardTopTravelersFailed: {
      return {
        ...state,
        error: action.payload.message,
        dashboard: {
          ...state.dashboard,
          loadings: {
            ...state.dashboard.loadings,
            topTravelers: false,
          },
        },
      };
    }

    case DashboardActionTypes.FetchDashboardTopHotelsSucceed: {
      const hotels: ReportData[] = action.payload;
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          hotels,
          loadings: {
            ...state.dashboard.loadings,
            topHotels: false,
          },
        },
      };
    }

    case DashboardActionTypes.FetchDashboardTopHotelsFailed: {
      return {
        ...state,
        error: action.payload.message,
        dashboard: {
          ...state.dashboard,
          loadings: {
            ...state.dashboard.loadings,
            topHotels: false,
          },
        },
      };
    }

    case DashboardActionTypes.FetchDashboardTopBookersSucceed: {
      const users: ReportData[] = action.payload;
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          users,
          loadings: {
            ...state.dashboard.loadings,
            topBookers: false,
          },
        },
      };
    }

    case DashboardActionTypes.FetchDashboardTopBookersFailed: {
      return {
        ...state,
        error: action.payload.message,
        dashboard: {
          ...state.dashboard,
          loadings: {
            ...state.dashboard.loadings,
            topBookers: false,
          },
        },
      };
    }

    case DashboardActionTypes.ChangeDashboardDateRange: {
      return {
        ...state,
        error: null,
        dateRange: {
          dateType: ReportDateTypes.Booking,
          startDate: action.payload.startDate,
          endDate: action.payload.endDate,
          minDate: ReportsConsts.dates.minDate,
          maxDate: ReportsConsts.dates.bookingMaxDate,
        },
        dashboard: initialDashboardState,
      };
    }

    case ReportsActionTypes.FetchClientFieldReportApi: {
      return {
        ...state,
        endpoint: clientfieldvalues + action.payload,
        isLoading: true,
        error: null,
        tripHubExpanded: false,
        customReportsExpanded: true,
        report: {
          reportMetadata: null,
          fieldsMetadata: [],
          fieldValues: [],
        },
        dateRange: {
          dateType: ReportDateTypes.Booking,
          startDate: state.dateRange.startDate,
          endDate: state.dateRange.endDate,
          minDate: ReportsConsts.dates.minDate,
          maxDate: ReportsConsts.dates.bookingMaxDate,
        },
      };
    }

    case ReportsActionTypes.FetchClientFieldReportApiSucceed: {
      return {
        ...state,
        isLoading: false,
        error: null,
        customReport: action.payload,
      };
    }

    case ReportsActionTypes.FetchClientFieldReportApiFailed: {
      return {
        ...state,
        error: action.payload.message,
        isLoading: false,
        customReport: [],
      };
    }

    case DashboardActionTypes.FetchTopPolicyOffenders: {
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          topPolicyOffenders: null,
          loadings: {
            ...state.dashboard.loadings,
            topPolicyOffenders: true,
          },
        },
      };
    }
    case DashboardActionTypes.FetchTopPolicyOffendersSucceed: {
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          topPolicyOffenders: {
            reportMetadata: action.payload.reportMetadata,
            fieldsMetadata: action.payload.fieldsMetadata,
            fieldValues: action.payload.fieldValues,
          },
          loadings: {
            ...state.dashboard.loadings,
            topPolicyOffenders: false,
          },
        },
      };
    }

    case DashboardActionTypes.FetchTopPolicyOffendersFailed: {
      return {
        ...state,
        error: action.payload.message,
        dashboard: {
          ...state.dashboard,
          loadings: {
            ...state.dashboard.loadings,
            topPolicyOffenders: false,
          },
        },
      };
    }

    case DashboardActionTypes.FetchComplianceRate: {
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          loadings: {
            ...state.dashboard.loadings,
            complianceRate: true,
          },
        },
      };
    }
    case DashboardActionTypes.FetchComplianceRateSucceed: {
      const complianceRate = action.payload.fieldValues[0]
        .complianceRate as number;
      return {
        ...state,
        dashboard: {
          ...state.dashboard,
          complianceRate,
          loadings: {
            ...state.dashboard.loadings,
            complianceRate: false,
          },
        },
      };
    }

    case DashboardActionTypes.FetchComplianceRateFailed: {
      return {
        ...state,
        error: action.payload.message,
        dashboard: {
          ...state.dashboard,
          loadings: {
            ...state.dashboard.loadings,
            complianceRate: false,
          },
        },
      };
    }

    default: {
      return state;
    }
  }
}
