import {
  TableHeader as TableHeaderPrimitive,
  TableHead,
  TableRow,
} from '@/shared/ui/table';

type Props = {
  className?: string;
};

export const TableHeader = (props: Props) => {
  const { className } = props;
  return (
    <TableHeaderPrimitive className={className}>
      <TableRow>
        <TableHead>ФИО</TableHead>
        <TableHead>Номер телефона</TableHead>
        <TableHead>Телеграм айди</TableHead>
        <TableHead>Телеграм ник</TableHead>
      </TableRow>
    </TableHeaderPrimitive>
  );
};
