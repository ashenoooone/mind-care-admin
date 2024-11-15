import {
  TableRow as PTableRow,
  TableCell,
} from '@/shared/ui/table';
import { TReport } from '../model/types';
import { Link } from '@/shared/ui/link';
import { ReactNode } from 'react';

type Props = {
  className?: string;
  report: TReport;
  actions?: ReactNode;
  status: ReactNode;
};

export const TableRow = (props: Props) => {
  const { className, report, actions, status } = props;

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
      <TableCell>{status}</TableCell>
      {actions}
    </PTableRow>
  );
};
