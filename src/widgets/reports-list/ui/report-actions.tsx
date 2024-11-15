import { TReport } from '@/entities/reports';
import {
  ChangeReportStatus,
  createChangeReportModalModel,
} from '@/features/reports/change-report-status';
import { useUnit } from 'effector-react';
type Props = {
  report: TReport;
};

const changeReportStatusModel =
  createChangeReportModalModel();

export const ReportActions = (props: Props) => {
  const { report } = props;

  const [openChangeReport, toggleChangeReport] = useUnit([
    changeReportStatusModel.$changeReportModalOpen,
    changeReportStatusModel.toggleModalEv,
  ]);

  return (
    <ChangeReportStatus
      report={report}
      open={openChangeReport}
      onOpenChange={toggleChangeReport}
    />
  );
};
