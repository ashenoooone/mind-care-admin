import { TAppointmentCalendar } from '@/entities/appointments';
import {
  format,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  parseISO,
} from 'date-fns';
import { Cell } from '../ui/cell';
import { DayCell } from '../ui/day-cell';
import { MonthEvent } from '../ui/month-event';
import { useAppointmentModalOpen } from '../appointment-modal';

type Props = {
  calendar: TAppointmentCalendar;
};

export const MonthModeHeader = () => {
  const weekDays = [
    'Пн',
    'Вт',
    'Ср',
    'Чт',
    'Пт',
    'Сб',
    'Вс',
  ];

  return (
    <div className="grid grid-cols-7 gap-1 bg-gray-50 p-2">
      {weekDays.map((day) => (
        <Cell key={day} border={false}>
          <div className="text-center font-medium text-gray-600">
            {day}
          </div>
        </Cell>
      ))}
    </div>
  );
};

export const MonthMode = ({ calendar }: Props) => {
  const { openEditModal, isAppointmentActive } =
    useAppointmentModalOpen();

  // Получаем первую дату из календаря
  const dates = Object.keys(calendar);
  const currentDate =
    dates.length > 0 ? parseISO(dates[0]) : new Date();

  const monthStart = startOfMonth(currentDate);
  const monthEnd = endOfMonth(currentDate);
  const days = eachDayOfInterval({
    start: monthStart,
    end: monthEnd,
  });

  // Получаем день недели для первого дня месяца (0 = воскресенье, 1 = понедельник, ...)
  const firstDayOfMonth = monthStart.getDay();
  // Корректируем для начала недели с понедельника
  const startOffset =
    firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;

  return (
    <div
      data-testid="month-mode-time-grid"
      className="grid grid-cols-7 gap-1"
    >
      {/* Пустые ячейки до первого дня месяца */}
      {Array.from({ length: startOffset }).map(
        (_, index) => (
          <Cell
            key={`empty-${index}`}
            className="h-32"
            border={false}
          />
        )
      )}

      {days.map((day) => {
        const formattedDate = format(
          day,
          "yyyy-MM-dd'T'00:00:00.000'Z'"
        );
        const dayEvents = calendar[formattedDate] || [];

        return (
          <DayCell
            key={day.toString()}
            day={day}
            events={dayEvents}
            renderEvent={(event) => (
              <MonthEvent
                key={event.id}
                event={event}
                isActive={isAppointmentActive(event)}
                onClick={() => openEditModal(event)}
              />
            )}
          />
        );
      })}
    </div>
  );
};
