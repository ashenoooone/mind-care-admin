import { TAppointment } from '@/entities/appointments';
import { format } from 'date-fns';
import clsx from 'clsx';

type Props = {
  event: TAppointment;
  isActive: boolean;
  onClick: () => void;
};

export const MonthEvent = ({
  event,
  isActive,
  onClick,
}: Props) => (
  <button
    className={clsx(
      'w-full text-left truncate rounded px-1 py-0.5 text-xs transition-colors',
      isActive
        ? 'bg-blue-200 text-blue-800'
        : 'bg-blue-100 text-blue-700 hover:bg-blue-150'
    )}
    title={`${event.service.name} - ${event.client.name}`}
    onClick={onClick}
  >
    {format(new Date(event.startTime), 'HH:mm')} -{' '}
    {event.service.name}
  </button>
);
