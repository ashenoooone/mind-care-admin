import { TAppointment } from '@/entities/appointments';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import clsx from 'clsx';
import { isToday } from 'date-fns';

type Props = {
  day: Date;
  events: TAppointment[];
  renderEvent: (event: TAppointment) => React.ReactNode;
};

export const DayCell = ({
  day,
  events,
  renderEvent,
}: Props) => (
  <div
    className={clsx(
      'h-32 border border-gray-200 p-2 overflow-auto',
      isToday(day) && 'bg-blue-50'
    )}
  >
    <div className="font-medium text-gray-700">
      {format(day, 'd', { locale: ru })}
    </div>
    <div className="mt-1 space-y-1">
      {events.map((event) => renderEvent(event))}
    </div>
  </div>
);
