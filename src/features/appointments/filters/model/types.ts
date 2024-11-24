export type FiltersStore = {
  sortDirection: 'asc' | 'desc';
  clientId: number | null;
  serviceId: number | null;
  dateFrom: Date | null;
  dateTo: Date | null;
  date: Date | null;
  page: number;
};
