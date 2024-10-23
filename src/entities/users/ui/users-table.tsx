import {
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
  Table,
} from '@/shared/ui/table';
import { TClient } from '../model/types';
import { getUserFio } from '../model/utils';
import { ReactNode } from 'react';
import { Link } from '@/shared/ui/link';
import { cn } from '@/shared/lib/utils';

type UsersTableProps = {
  users?: TClient[];
  footer?: ReactNode;
};

export const UsersTable = (props: UsersTableProps) => {
  const { users, footer } = props;
  return (
    <Table>
      <TableCaption>Список клиентов</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ФИО</TableHead>
          <TableHead>Номер телефона</TableHead>
          <TableHead>Телеграм айди</TableHead>
          <TableHead>Телеграм ник</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users?.map((c) => (
          <TableRow key={c.telegram_id}>
            <TableCell>{getUserFio(c)}</TableCell>
            <TableCell>{c.phone}</TableCell>
            <TableCell>{c.telegram_id}</TableCell>
            <TableCell>
              <Link
                rel="noopener noreferer"
                target="_blank"
                href={`https://t.me/${c.username}`}
              >
                {(params) => {
                  return (
                    <span>
                      <span
                        className={cn(
                          'opacity-0 transition-all text-white',
                          {
                            'opacity-100': params.hovered,
                          }
                        )}
                      >
                        @
                      </span>
                      <span>{c.username}</span>
                    </span>
                  );
                }}
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
      <TableFooter>{footer}</TableFooter>
    </Table>
  );
};
