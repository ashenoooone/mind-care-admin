import { TAppointmentCalendar } from '@/entities/appointments';
import { TimeGrid } from '../ui/time-grid';
import { Column } from '../ui/column';
import { getTableColumnTitle } from '../domain/table';
import { cn } from '@/shared/lib/utils';
import { Cell } from '../ui/cell';
import { Event } from '../ui/event';

type Props = {
  calendar: TAppointmentCalendar;
};

export const WeekMode = (props: Props) => {
  const { calendar } = props;

  return (
    <TimeGrid
      mode="week"
      columns={Object.keys(calendar).map((day) => (
        <Column
          key={day}
          events={calendar[day]}
          renderEvent={(event, hour) => (
            <Event event={event} hour={hour} />
          )}
        />
      ))}
    />
  );
};

export const WeekModeHeader = (props: Props) => {
  const { calendar } = props;

  const columns = Object.keys(calendar).map((day) => {
    const isToday =
      new Date(day).toDateString() ===
      new Date().toDateString();
    const title = getTableColumnTitle(day);

    const [dayName, date] = title.split(' ');

    return {
      dayName,
      date,
      isToday,
    };
  });

  return (
    <div
      className={cn(
        'w-full grid text-center font-bold grid-cols-5'
      )}
    >
      {columns.map((column) => (
        <Cell key={column.dayName} border={false}>
          <div>
            <div>{column.dayName}</div>
            <div
              className={cn(
                'w-8 h-8 rounded-full flex items-center justify-center mx-auto',
                {
                  'bg-red-500 text-white': column.isToday,
                }
              )}
            >
              {column.date}
            </div>
          </div>
        </Cell>
      ))}
    </div>
  );
};
