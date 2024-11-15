import {
  Table as PTable,
  TableBody,
  TableFooter,
} from '@/shared/ui/table';
import { ReactNode } from 'react';

type Props = {
  className?: string;
  header?: ReactNode;
  reports?: ReactNode;
  footer?: ReactNode;
};

export const Table = (props: Props) => {
  const { className, header, footer, reports } = props;
  return (
    <PTable className={className}>
      {header}
      <TableBody>{reports}</TableBody>
      <TableFooter>{footer}</TableFooter>
    </PTable>
  );
};
