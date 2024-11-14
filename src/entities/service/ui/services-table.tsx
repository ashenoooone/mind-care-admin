import { cn } from '@/shared/lib/utils';
import { Table, TableBody } from '@/shared/ui/table';
import { ReactNode } from 'react';

type ServicesTableProps = {
  className?: string;
  services: ReactNode;
  header: ReactNode;
};

export const ServicesTable = (
  props: ServicesTableProps
) => {
  const { className, services, header } = props;
  return (
    <Table className={cn('', className)}>
      {header}
      <TableBody>{services}</TableBody>
    </Table>
  );
};
