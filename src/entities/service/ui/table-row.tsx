import {
  TableCell,
  TableRow as TableRowPrimitive,
} from '@/shared/ui/table';
import { TService } from '../model/types';
import { formatToHourRate } from '@/shared/lib/format-to-hour-rate';
import { formatToMinutes } from '@/shared/lib/format-to-minutes';
import { ReactNode } from 'react';

type Props = {
  className?: string;
  service: TService;
  editButton?: ReactNode;
  removeButton?: ReactNode;
};

export const TableRow = (props: Props) => {
  const { className, service, removeButton, editButton } =
    props;
  return (
    <TableRowPrimitive className={className}>
      <TableCell>{service.id}</TableCell>
      <TableCell>{service.name}</TableCell>
      <TableCell>{service.description}</TableCell>
      <TableCell>
        {formatToMinutes(service.duration)}
      </TableCell>
      <TableCell>
        {formatToHourRate(service.price)}
      </TableCell>
      {removeButton}
      {editButton}
    </TableRowPrimitive>
  );
};
