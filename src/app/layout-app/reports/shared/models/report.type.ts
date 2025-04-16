export enum ReportNameTranslation {
  dashboard = 'reports.nav.dashboard',
  hotel = 'reports.nav.hotels',
  user = 'reports.nav.user',
  passenger = 'reports.nav.passenger',
  reservation = 'reports.nav.reservation',
  division = 'reports.nav.division',
  compliance = 'reports.nav.compliance',
  customReports = 'reports.nav.customReports',
  dutyofcare = 'reports.nav.dutyofcare',
  outOfPolicy = 'reports.nav.outofpolicy',
  traveler = 'reports.nav.traveler',
  bookers = 'reports.nav.bookers',
  trainline = 'reports.nav.trainline',
  roomexPay = 'reports.nav.roomexPay',
}

export enum ComplianceHeadersTranslation {
  reservationReference = 'reports.compliance.headerName.reservationReference',
  checkInDate = 'reports.compliance.headerName.checkInDate',
  nights = 'reports.compliance.headerName.nights',
  hotel = 'reports.compliance.headerName.hotel',
  city = 'reports.compliance.headerName.city',
  booker = 'reports.compliance.headerName.booker',
  travellers = 'reports.compliance.headerName.travellers',
  bookedDate = 'reports.compliance.headerName.bookedDate',
  reason = 'reports.compliance.headerName.reason',
  spend = 'reports.compliance.headerName.spend',
  averageRoomNightCost = 'reports.compliance.headerName.averageRoomNightCost',
  policyPerPersonPerNight = 'reports.compliance.headerName.policyPerPersonPerNight',
  withinPolicySpend = 'reports.compliance.headerName.withinPolicySpend',
  overSpend = 'reports.compliance.headerName.overSpend',
  numberOfRooms = 'reports.compliance.headerName.numberOfRooms',
}

export enum TravelerHeadersTranslation {
  travelerName = 'reports.traveler.headerName.travelerName',
  bookingsCount = 'reports.traveler.headerName.bookingsCount',
  nightsCount = 'reports.traveler.headerName.nightsCount',
  totalSpend = 'reports.traveler.headerName.totalSpend',
  totalSavings = 'reports.traveler.headerName.totalSavings',
  averageRoomNightCost = 'reports.traveler.headerName.averageRoomNightCost',
}

export enum HotelHeadersTranslation {
  hotelName = 'reports.hotel.headerName.hotelName',
  city = 'reports.hotel.headerName.city',
  country = 'reports.hotel.headerName.country',
  bookingsCount = 'reports.hotel.headerName.bookingsCount',
  nightsCount = 'reports.hotel.headerName.nightsCount',
  totalSpend = 'reports.hotel.headerName.totalSpend',
  averageRoomNightCost = 'reports.hotel.headerName.averageRoomNightCost',
  savings = 'reports.hotel.headerName.savings',
}

export enum BookerHeadersTranslation {
  username = 'reports.bookers.headerName.username',
  lastBookedAt = 'reports.bookers.headerName.lastBookedAt',
  bookingsCount = 'reports.bookers.headerName.bookingsCount',
  nightsCount = 'reports.bookers.headerName.nightsCount',
  travelersCount = 'reports.bookers.headerName.travelersCount',
  totalSpend = 'reports.bookers.headerName.totalSpend',
  totalSavings = 'reports.bookers.headerName.totalSavings',
  averageRoomNightCost = 'reports.bookers.headerName.averageRoomNightCost',
}

export enum ClientFieldHeadersTranslation {
  clientFieldValue = 'reports.clientField.headerName.clientFieldValue',
  reservationCount = 'reports.clientField.headerName.reservationCount',
  roomNightCount = 'reports.clientField.headerName.roomNightCount',
  paxCount = 'reports.clientField.headerName.paxCount',
  currencyCode = 'reports.clientField.headerName.currencyCode',
  totalSpend = 'reports.clientField.headerName.totalSpend',
  avgReservationSpend = 'reports.clientField.headerName.avgReservationSpend',
  avgRoomNightSpend = 'reports.clientField.headerName.avgRoomNightSpend',
  avgPaxRoomNightSpend = 'reports.clientField.headerName.avgPaxRoomNightSpend',
  percentSaving = 'reports.clientField.headerName.percentSaving',
  totalSaving = 'reports.clientField.headerName.totalSaving',
  altSpend = 'reports.clientField.headerName.altSpend',
}

export enum TrainlineHeadersTranslation {
  transactionId = 'reports.trainline.headerName.transactionId',
  bookingDate = 'reports.trainline.headerName.bookingDate',
  departureDate = 'reports.trainline.headerName.departureDate',
  bookerName = 'reports.trainline.headerName.bookerName',
  ticketType = 'reports.trainline.headerName.ticketType',
  originStationName = 'reports.trainline.headerName.originStationName',
  destinationStationName = 'reports.trainline.headerName.destinationStationName',
  travelers = 'reports.trainline.headerName.travelers',
  totalCost = 'reports.trainline.headerName.totalCost',
  returnDate = 'reports.trainline.headerName.returnDate',
  currencyCode = 'reports.trainline.headerName.currencyCode',
}

export enum RoomexPayHeadersTranslation {
  date = 'reports.roomexPay.headerName.date',
  employee = 'reports.roomexPay.headerName.employee',
  merchant = 'reports.roomexPay.headerName.merchant',
  category = 'reports.roomexPay.headerName.category',
  receipt = 'reports.roomexPay.headerName.receipt',
  billAmount = 'reports.roomexPay.headerName.billAmount',
  notes = 'reports.roomexPay.headerName.notes',
  totalSpend = 'reports.roomexPay.headerName.totalSpend',
}

export enum NewReportType {
  Compliance = 'compliance',
  Traveler = 'traveler',
  Hotels = 'hotels',
  Bookers = 'bookers',
  Clientfield = 'clientfield',
  Dashboard = 'dashboard',
  Trainline = 'trainline',
  RoomexPay = 'roomexPay',
}

export enum ReportDateTypes {
  Booking = 'booking',
  CheckIn = 'check-in',
  CheckOut = 'check-out',
}

export enum Clientfield {
  name = 'clientfieldName',
}
