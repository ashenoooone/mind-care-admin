import { cn } from '@/shared/lib/utils';
import {
  getEvent,
  getEventStyles,
  TimeGridEvent,
} from '../domain/time-grid';

type Props<T extends TimeGridEvent> = {
  className?: string;
  days: string[];
  mode?: 'week' | 'day';
  events: Record<string, T[]>;
  renderDay: (day: string) => React.ReactNode;
  renderEvent: (event: T) => React.ReactNode;
};

const START_HOUR = 8;
const TOTAL_HOURS = 24;

const hours = Array.from(
  { length: TOTAL_HOURS - START_HOUR },
  (_, i) => i + START_HOUR
);

export const TimeGrid = <T extends TimeGridEvent>(
  props: Props<T>
) => {
  const {
    className,
    days,
    mode = 'week',
    renderEvent,
    renderDay,
    events,
  } = props;

  return (
    <div className="flex">
      <HoursColumn />
      <div
        className={cn(
          `w-full grid overflow-auto`,
          {
            'grid-cols-5': mode === 'week',
            'grid-cols-1': mode === 'day',
          },
          className
        )}
      >
        {days.map((day) => (
          <Column
            renderEvent={renderEvent}
            renderDay={renderDay}
            events={events[day]}
            title={day}
            key={day}
          />
        ))}
      </div>
    </div>
  );
};

const Column = <T extends TimeGridEvent>(props: {
  title: string;
  className?: string;
  events: T[];
  renderEvent: (event: T) => React.ReactNode;
  renderDay: (day: string) => React.ReactNode;
}) => {
  const {
    title,
    className,
    events,
    renderEvent,
    renderDay,
  } = props;

  console.log(events);

  return (
    <div
      className={cn('flex flex-col border-r', className)}
    >
      <Cell className="font-bold text-center">
        {renderDay(title)}
      </Cell>
      {hours.map((hour) => {
        const event = getEvent({
          events,
          hour,
        });

        let content = null;
        let styles: React.CSSProperties | undefined;

        if (event) {
          styles = getEventStyles({
            event,
            hour,
          });

          content = (
            <div
              className="bg-red-400 absolute w-full z-20 p-2 rounded-xl"
              style={styles}
            >
              {renderEvent(event)}
            </div>
          );
        }

        return (
          <Cell key={hour} className="relative">
            {content}
          </Cell>
        );
      })}
    </div>
  );
};

const HoursColumn = () => {
  return (
    <div className="flex flex-col min-w-12">
      <Cell border={false} />
      {hours.map((hour) => (
        <Cell
          key={hour}
          className="relative select-none"
          border={false}
        >
          <span className="absolute -top-3">
            {hour.toString().padStart(2, '0')}:00
          </span>
        </Cell>
      ))}
    </div>
  );
};

const Cell = (props: {
  children?: React.ReactNode;
  border?: boolean;
  className?: string;
}) => {
  const { children, border = true, className } = props;
  return (
    <div
      className={cn(
        `h-[60px] shrink-0`,
        {
          'border-t last:border-b first:border-t-0': border,
        },
        className
      )}
    >
      {children}
    </div>
  );
};
