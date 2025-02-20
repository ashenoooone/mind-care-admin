export type TimeGridEvent = {
  startTime: string;
  endTime: string;
};

const START_HOUR = 8;
const TOTAL_HOURS = 24;

export const HOURS = Array.from(
  { length: TOTAL_HOURS - START_HOUR },
  (_, i) => i + START_HOUR
);

/**
 * Находит событие, которое начинается в указанный час
 * @param params.events - Массив событий
 * @param params.hour - Час для поиска события
 * @returns Событие, которое начинается в указанный час, или undefined если такого события нет
 */
export const findEventStartingAtHour = <
  T extends TimeGridEvent,
>(params: {
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
