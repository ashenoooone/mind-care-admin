import { cn } from '@/shared/lib/utils';
import { TService } from '../model/types';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/ui/table';
import { ReactNode } from 'react';
import { formatToHourRate } from '@/shared/lib/format-to-hour-rate';
import { formatToMinutes } from '@/shared/lib/format-to-minutes';

type ServicesTableProps = {
  className?: string;
  services: TService[];
  getEditServiceButton?: (service: TService) => ReactNode;
  getRemoveServiceButton?: (service: number) => ReactNode;
};

const TABLE_HEADS: (keyof TService)[] = [
  'id',
  'title',
  'duration',
  'after_pause',
  'cost',
];

const MAPPER: Record<keyof TService, string> = {
  id: 'ID',
  title: 'Название',
  duration: 'Длительность (в мин)',
  after_pause: 'Пауза после услуги (в мин)',
  cost: 'Стоимость',
};

export const ServicesTable = (
  props: ServicesTableProps
) => {
  const {
    className,
    services,
    getEditServiceButton,
    getRemoveServiceButton,
  } = props;
  return (
    <Table className={cn('', className)}>
      <TableHeader>
        <TableRow>
          {TABLE_HEADS.map((head) => (
            <TableHead key={head}>{MAPPER[head]}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {services.map((service) => (
          <TableRow key={service.id}>
            <TableCell>{service.id}</TableCell>
            <TableCell>{service.title}</TableCell>
            <TableCell>
              {formatToMinutes(service.duration)}
            </TableCell>
            <TableCell>
              {formatToMinutes(service.after_pause)}
            </TableCell>
            <TableCell>
              {formatToHourRate(service.cost)}
            </TableCell>
            {getEditServiceButton && (
              <TableCell>
                {getEditServiceButton(service)}
              </TableCell>
            )}
            {getRemoveServiceButton && (
              <TableCell>
                {getRemoveServiceButton(service.id)}
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
