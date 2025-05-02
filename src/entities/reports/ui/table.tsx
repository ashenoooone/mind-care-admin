import {
  Table as PTable,
  TableBody,
  TableFooter,
} from '@/shared/ui/table';
import React, { ReactNode } from 'react';

type Props = {
  className?: string;
  header?: ReactNode;
  reports?: ReactNode;
  footer?: ReactNode;
} & React.ComponentProps<'table'>;

export const Table = (props: Props) => {
  const { className, header, footer, reports, ...rest } =
    props;
  return (
    <PTable className={className} {...rest}>
      {header}
      <TableBody>{reports}</TableBody>
      <TableFooter>{footer}</TableFooter>
    </PTable>
  );
};
