import {
  addDays,
  addMonths,
  addWeeks,
  endOfMonth,
  endOfWeek,
  format,
  startOfMonth,
  startOfWeek,
} from 'date-fns';
import { ru } from 'date-fns/locale';

export type TableShowMode = 'week' | 'day' | 'month';

export type TableUnitIndex = number;

export const getPeriodForTable = ({
  showMode,
  unitIndex,
}: {
  showMode: TableShowMode;
  unitIndex: TableUnitIndex;
}): {
  fromDate: string;
  toDate: string;
} => {
  let currentDate = new Date();

  if (showMode === 'day') {
    currentDate = addDays(currentDate, unitIndex);
    return {
      fromDate: format(currentDate, 'yyyy-MM-dd'),
      toDate: format(currentDate, 'yyyy-MM-dd'),
    };
  }

  if (showMode === 'week') {
    currentDate = addWeeks(currentDate, unitIndex);
    return {
      fromDate: format(
        startOfWeek(currentDate, { weekStartsOn: 1 }),
        'yyyy-MM-dd'
      ),
      toDate: format(
        endOfWeek(currentDate, { weekStartsOn: 1 }),
        'yyyy-MM-dd'
      ),
    };
  }

  currentDate = addMonths(currentDate, unitIndex);

  return {
    fromDate: format(
      startOfMonth(currentDate),
      'yyyy-MM-dd'
    ),
    toDate: format(endOfMonth(currentDate), 'yyyy-MM-dd'),
  };
};

export const getTitleForTable = ({
  showMode,
  unitIndex,
}: {
  showMode: TableShowMode;
  unitIndex: TableUnitIndex;
}) => {
  let currentDate = new Date();

  if (showMode === 'day') {
    currentDate = addDays(currentDate, unitIndex);
    const dayName = format(currentDate, 'EEEE', {
      locale: ru,
    });
    return `${dayName.charAt(0).toUpperCase()}${dayName.slice(1)} ${format(currentDate, 'd')}`;
  }

  if (showMode === 'week') {
    currentDate = addWeeks(currentDate, unitIndex);
    const monthName = format(currentDate, 'LLLL', {
      locale: ru,
    });
    return `${monthName.charAt(0).toUpperCase()}${monthName.slice(1)}, ${format(currentDate, 'yyyy')}`;
  }

  currentDate = addMonths(currentDate, unitIndex);
  const monthName = format(currentDate, 'LLLL', {
    locale: ru,
  });
  return `${monthName.charAt(0).toUpperCase()}${monthName.slice(1)}, ${format(currentDate, 'yyyy')}`;
};
