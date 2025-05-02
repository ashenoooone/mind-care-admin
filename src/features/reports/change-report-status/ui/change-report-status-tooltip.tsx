import { ReportStatus, TReport } from '@/entities/reports';
import { REPORT_STATUS_MAPPER } from '@/entities/reports/model/lib';

import { useChangeReportStatus } from '../model/hooks';
import { Dialog, DialogContent } from '@/shared/ui/dialog';
import { Badge } from '@/shared/ui/badge';

type Props = {
  report: TReport;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
};

export const ChangeReportStatus = (props: Props) => {
  const { report, open, onOpenChange } = props;

  const changeReportStatus = useChangeReportStatus();

  const handleClickReportStatus =
    (reportStatus: ReportStatus) => () => {
      changeReportStatus.mutate({
        id: report.id,
        status: reportStatus,
      });
    };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="sm:max-w-[425px]"
        data-testid="change-report-status-dialog"
      >
        <div className="grid grid-cols-2 gap-2">
          <Badge
            color="green"
            className="cursor-pointer hover:scale-105 transition-all"
            onClick={handleClickReportStatus('RESOLVED')}
            data-testid="change-report-status-dialog-resolved"
          >
            {REPORT_STATUS_MAPPER.RESOLVED}
          </Badge>
          <Badge
            color="blue"
            className="cursor-pointer hover:scale-105 transition-all"
            onClick={handleClickReportStatus('PENDING')}
            data-testid="change-report-status-dialog-pending"
          >
            {REPORT_STATUS_MAPPER.PENDING}
          </Badge>
          <Badge
            color="yellow"
            className="cursor-pointer hover:scale-105 transition-all"
            onClick={handleClickReportStatus('IN_PROGRESS')}
            data-testid="change-report-status-dialog-in_progress"
          >
            {REPORT_STATUS_MAPPER.IN_PROGRESS}
          </Badge>
          <Badge
            color="red"
            className="cursor-pointer hover:scale-105 transition-all"
            onClick={handleClickReportStatus('CLOSED')}
            data-testid="change-report-status-dialog-closed"
          >
            {REPORT_STATUS_MAPPER.CLOSED}
          </Badge>
        </div>
      </DialogContent>
    </Dialog>
  );
};
