import {
  TableRow as PTableRow,
  TableCell,
} from '@/shared/ui/table';
import { ReportStatus, TReport } from '../model/types';
import { Link } from '@/shared/ui/link';
import { Badge, BadgeProps } from '@/shared/ui/badge';
import { REPORT_STATUS_MAPPER } from '../model/lib';

type Props = {
  className?: string;
  report: TReport;
};

const REPORT_COLOR_MAPPER: Record<
  ReportStatus,
  BadgeProps['color']
> = {
  CLOSED: 'red',
  IN_PROGRESS: 'yellow',
  RESOLVED: 'green',
  PENDING: 'blue',
};

export const TableRow = (props: Props) => {
  const { className, report } = props;

  const reportDate = new Date(report.createdAt);
  const reportTime = reportDate.toLocaleTimeString();
  const reportDateLocal = reportDate.toLocaleDateString();

  return (
    <PTableRow className={className}>
      <TableCell>
        <Link
          rel="noopener noreferer"
          target="_blank"
          href={`https://t.me/${report.client.tgNickname}`}
        >
          <span>
            @<span>{report.client.tgNickname}</span>
          </span>
        </Link>
      </TableCell>
      <TableCell>
        {reportDateLocal} {reportTime}
      </TableCell>
      <TableCell>{report.description}</TableCell>
      <TableCell>
        <Badge
          className="font-bold w-max"
          color={REPORT_COLOR_MAPPER[report.status]}
        >
          {REPORT_STATUS_MAPPER[report.status]}
        </Badge>
      </TableCell>
    </PTableRow>
  );
};
