'use client';
import { ChangeReportStatus } from '@/features/reports/change-report-status';
import { ReportsTable } from './table';
import { useUnit } from 'effector-react';
import { changeReportStatusModel } from '../model/models';

export const ReportsList = () => {
  const [report, openChangeReportModal] = useUnit([
    changeReportStatusModel.$report,
    changeReportStatusModel.openChangeReportModal,
  ]);

  return (
    <div>
      <ReportsTable />
      {report && (
        <ChangeReportStatus
          open={!!report}
          report={report}
          onOpenChange={(open) => {
            if (!open) {
              openChangeReportModal(null);
            }
          }}
        />
      )}
    </div>
  );
};
