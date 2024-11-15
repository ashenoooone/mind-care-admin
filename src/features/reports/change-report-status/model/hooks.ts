import {
  REPORTS_BASE_QUERY_KEY,
  ReportsService,
} from '@/entities/reports';
import { mutationOptions } from '@/shared/lib/mutation-options';
import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

export const CHANGE_REPORT_STATUS_MUTATION =
  mutationOptions<typeof ReportsService.patchReport>({
    mutationKey: ['change_report_status'],
    mutationFn: (params) =>
      ReportsService.patchReport(params),
  });

export const useChangeReportStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    ...CHANGE_REPORT_STATUS_MUTATION,
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: [REPORTS_BASE_QUERY_KEY],
      });
    },
  });
};
