import {
  REPORT_STATUS_MAPPER,
  ReportStatus,
  Table,
  TableHeader,
  TableRow,
  useGetReportsQuery,
} from '@/entities/reports';
import { Badge, BadgeProps } from '@/shared/ui/badge';
import Loader from '@/shared/ui/loader';
import { useUnit } from 'effector-react';
import {
  changeReportStatusModel,
  reportsListParamsModel,
} from '../model/models';
import Pagination from '@/shared/ui/pagination';

const REPORT_COLOR_MAPPER: Record<
  ReportStatus,
  BadgeProps['color']
> = {
  CLOSED: 'red',
  IN_PROGRESS: 'yellow',
  RESOLVED: 'green',
  PENDING: 'blue',
};

export const ReportsTable = () => {
  const { $page, changePageEv } = useUnit(
    reportsListParamsModel
  );
  const { data, isError, isLoading } = useGetReportsQuery({
    page: $page,
  });

  const [openChangeStatusModal] = useUnit([
    changeReportStatusModel.openChangeReportModal,
  ]);

  if (isLoading || isError || !data?.data) {
    return <Loader />;
  }

  return (
    <div>
      <Table
        header={<TableHeader />}
        reports={data?.data.items.map((report) => (
          <TableRow
            report={report}
            key={report.id}
            status={
              <Badge
                onClick={() =>
                  openChangeStatusModal(report)
                }
                className="font-bold w-max cursor-pointer hover:scale-105 transition-all"
                color={REPORT_COLOR_MAPPER[report.status]}
              >
                {REPORT_STATUS_MAPPER[report.status]}
              </Badge>
            }
          />
        ))}
      />
      {data.data.meta.totalPages > 1 && (
        <Pagination
          meta={data.data.meta}
          onPageChange={(page) => changePageEv(page)}
        />
      )}
    </div>
  );
};
