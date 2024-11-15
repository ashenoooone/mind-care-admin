import {
  TableHeader as PTableHeader,
  TableHead,
  TableRow,
} from '@/shared/ui/table';

type Props = {
  className?: string;
};

export const TableHeader = (props: Props) => {
  const { className } = props;
  return (
    <PTableHeader className={className}>
      <TableRow>
        <TableHead>Клиент</TableHead>
        <TableHead>Дата обращения</TableHead>
        <TableHead>Описание</TableHead>
        <TableHead>Статус</TableHead>
      </TableRow>
    </PTableHeader>
  );
};
