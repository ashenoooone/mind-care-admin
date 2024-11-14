import { cn } from '@/shared/lib/utils';
import {
  TableCell,
  TableRow as TableRowPrimitive,
} from '@/shared/ui/table';
import { TClient } from '../model/types';
import { Link } from '@/shared/ui/link';

type Props = {
  className?: string;
  user: TClient;
};

export const TableRow = (props: Props) => {
  const { className, user } = props;
  return (
    <TableRowPrimitive className={className}>
      <TableCell>{user.name}</TableCell>
      <TableCell>{user.phoneNumber}</TableCell>
      <TableCell>{user.telegramId}</TableCell>
      <TableCell>
        <Link
          rel="noopener noreferer"
          target="_blank"
          href={`https://t.me/${user.tgNickname}`}
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
                <span>{user.tgNickname}</span>
              </span>
            );
          }}
        </Link>
      </TableCell>
    </TableRowPrimitive>
  );
};
