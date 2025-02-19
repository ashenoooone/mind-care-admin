import { getMinutes } from 'date-fns';

export const GRID_CELL_HEIGHT = 60;

export type TimeGridEvent = {
  startTime: string;
  endTime: string;
};

export const getEvent = <T extends TimeGridEvent>(params: {
  events: T[];
  hour: number;
}) => {
  const { events, hour } = params;
  return events.find((event) => {
    const startDate = new Date(event.startTime);
    const hours = startDate.getHours();
    return hours === hour;
  });
};

export const getEventStyles = <
  T extends TimeGridEvent,
>(params: {
  event: T;
  hour: number;
}) => {
  const startDate = new Date(params.event.startTime);
  const endDate = new Date(params.event.endTime);
  const duration =
    (endDate.getTime() - startDate.getTime()) / (1000 * 60);

  const heightMultiplier = duration / 60;
  const top = getMinutes(startDate);

  return {
    height: heightMultiplier * GRID_CELL_HEIGHT,
    top: top,
  };
};
