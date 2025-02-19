import { TAppointment } from '@/entities/appointments';
import { cn } from '@/shared/lib/utils';
import { format } from 'date-fns';

type Props = {
  className?: string;
  item: TAppointment;
};

const formatTime = (date: Date) => {
  return format(date, 'HH:mm');
};

export const TableItem = (props: Props) => {
  const { className, item } = props;
  return (
    <div
      className={cn(
        'border px-2 pt-1 pb-2 rounded bg-yellow-200/10',
        className
      )}
    >
      <div className="flex flex-col">
        <p className="text-sm font-bold text-center rounded-t">
          {formatTime(item.startTime)} -{' '}
          {formatTime(item.endTime)}
        </p>

        <h3 className="text-sm font-bold">
          {item.service.name}
        </h3>
      </div>
      <p className="text-sm">{item.client.name}</p>
    </div>
  );
};
