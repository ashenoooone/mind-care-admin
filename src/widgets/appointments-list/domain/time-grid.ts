export type TimeGridEvent = {
  startTime: string;
  endTime: string;
};

// TODO: в идеале с бека получать эти значения
export const START_HOUR = 8;
export const TOTAL_HOURS = 24;

export const HOURS = Array.from(
  { length: TOTAL_HOURS - START_HOUR },
  (_, i) => i + START_HOUR
);

/**
 * Находит все события, которые начинаются в указанный час
 * @param params.events - Массив событий
 * @param params.hour - Час для поиска событий
 * @returns Массив событий, которые начинаются в указанный час
 */
export const findEventsStartingAtHour = <
  T extends TimeGridEvent,
>(params: {
  events: T[];
  hour: number;
}) => {
  const { events, hour } = params;
  return events.filter((event) => {
    const startDate = new Date(event.startTime);
    const hours = startDate.getUTCHours() + 1;

    return hours === hour;
  });
};
