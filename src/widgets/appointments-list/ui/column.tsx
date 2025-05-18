import { cn } from '@/shared/lib/utils';
import {
  findEventStartingAtHour,
  TimeGridEvent,
} from '../domain/time-grid';
import { Cell } from './cell';
import { calculateTimeGridEventStyles } from '../lib';
import React from 'react';
import { HOURS } from '../domain/time-grid';

type Props<T extends TimeGridEvent> = {
  className?: string;
  events: T[];
  renderEvent: (event: T, hour: number) => JSX.Element;
};

export const Column = <T extends TimeGridEvent>(
  props: Props<T>
) => {
  const { className, events, renderEvent } = props;

  const renderHourCell = (hour: number) => {
    // TODO: поддержка если несколько ивентов в один час

    const event = findEventStartingAtHour({
      events,
      hour,
    });

    if (!event) {
      return <Cell />;
    }

    const styles = calculateTimeGridEventStyles({
      event,
      hour,
    });

    const initialElement = renderEvent(event, hour);
    const elementProps = initialElement.props;

    const element = React.cloneElement(initialElement, {
      ...elementProps,
      style: styles,
    });

    return <Cell>{element}</Cell>;
  };

  return (
    <div
      className={cn('flex flex-col border-r', className)}
    >
      {HOURS.map(renderHourCell)}
    </div>
  );
};
