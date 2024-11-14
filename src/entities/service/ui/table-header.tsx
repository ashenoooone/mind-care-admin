import {
  TableHead,
  TableHeader as TableHeaderPrimitive,
  TableRow,
} from '@/shared/ui/table';
import { TService } from '../model/types';

type Props = {
  className?: string;
};

const TABLE_HEADS: (keyof TService)[] = [
  'id',
  'name',
  'description',
  'duration',
  'after_pause',
  'price',
];

const MAPPER: Record<keyof TService, string> = {
  id: 'ID',
  name: 'Название',
  description: 'Описание',
  duration: 'Длительность (в мин)',
  after_pause: 'Пауза после услуги (в мин)',
  price: 'Стоимость',
};

export const TableHeader = (props: Props) => {
  const { className } = props;
  return (
    <TableHeaderPrimitive className={className}>
      <TableRow>
        {TABLE_HEADS.map((head) => (
          <TableHead key={head}>{MAPPER[head]}</TableHead>
        ))}
      </TableRow>
    </TableHeaderPrimitive>
  );
};
