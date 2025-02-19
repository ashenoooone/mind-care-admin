import { TAppointmentCalendar } from '@/entities/appointments';
import { getTableColumnTitle } from '../domain/table';
import { TimeGrid } from '../ui/time-grid';

type Props = {
  calendar: TAppointmentCalendar;
};

export const WeekMode = (props: Props) => {
  const { calendar } = props;

  const days = Object.keys(calendar);

  return (
    <TimeGrid
      events={calendar}
      days={days}
      renderDay={getTableColumnTitle}
      renderEvent={(event) => {
        return (
          <div className="flex flex-col text-sm">
            <div>{event.service.name}</div>
          </div>
        );
      }}
    />
  );
};
