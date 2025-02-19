import { TAppointmentCalendar } from '@/entities/appointments';
import { TableColumn } from '../ui/table-column';
import { getTableColumnTitle } from '../domain';
import { cn } from '@/shared/lib/utils';
import { TableItem } from '../ui/table-item';

type Props = {
  className?: string;
  calendar: TAppointmentCalendar;
};

export const WeekMode = (props: Props) => {
  const { className, calendar } = props;

  const days = Object.keys(calendar);

  return (
    <div
      className={cn('flex w-full items-stretch', className)}
    >
      {days.map((day) => (
        <TableColumn
          key={day}
          title={getTableColumnTitle(day)}
          items={calendar[day].map((item) => (
            <TableItem key={item.id} item={item} />
          ))}
        />
      ))}
    </div>
  );
};
