import {
  TableBody,
  TableFooter,
  Table,
} from '@/shared/ui/table';
import { ReactNode } from 'react';

type UsersTableProps = {
  footer?: ReactNode;
  header: ReactNode;
  users: ReactNode;
};

export const UsersTable = (props: UsersTableProps) => {
  const { footer, header, users } = props;
  return (
    <Table>
      {header}
      <TableBody>{users}</TableBody>
      <TableFooter>{footer}</TableFooter>
    </Table>
  );
};
