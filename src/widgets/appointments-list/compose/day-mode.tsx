import { TAppointmentCalendar } from '@/entities/appointments';
import { TimeGrid } from '../ui/time-grid';
import { Column } from '../ui/column';

import { Event } from '../ui/event';
import { useAppointmentModalOpen } from '../appointment-modal';

type Props = {
  calendar: TAppointmentCalendar;
};

export const DayMode = (props: Props) => {
  const { calendar } = props;
  const { isAppointmentActive, openEditModal } =
    useAppointmentModalOpen();
  const days = Object.keys(calendar);

  if (days.length === 0) {
    return null;
  }

  const currentDay = days[0];

  return (
    <TimeGrid
      mode="day"
      columns={
        <Column
          events={calendar[currentDay]}
          renderEvent={(event, hour) => (
            <Event
              onClick={() => openEditModal(event)}
              event={event}
              hour={hour}
              isActive={isAppointmentActive(event)}
            />
          )}
        />
      }
    />
  );
};
