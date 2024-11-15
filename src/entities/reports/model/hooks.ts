import { useQuery } from '@tanstack/react-query';
import { ReportsService } from './reports.service';

export const REPORTS_BASE_QUERY_KEY = 'reports';

export const useGetReportsQuery = (
  params: FuncFirstParameter<
    typeof ReportsService.getReports
  >
) => {
  return useQuery({
    queryKey: [
      REPORTS_BASE_QUERY_KEY,
      params.limit,
      params.page,
    ],
    queryFn: () => ReportsService.getReports(params),
  });
};
