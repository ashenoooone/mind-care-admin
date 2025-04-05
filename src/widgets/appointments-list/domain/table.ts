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

/**
 * Возвращает период для таблицы в зависимости от режима отображения
 * @param showMode - Режим отображения (день/неделя/месяц)
 * @param unitIndex - Индекс смещения от текущей даты
 * @returns Объект с датами начала и конца периода в формате 'yyyy-MM-dd'
 */
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

/**
 * Возвращает заголовок для таблицы в зависимости от режима отображения
 * @param showMode - Режим отображения (день/неделя/месяц)
 * @param unitIndex - Индекс смещения от текущей даты
 * @returns Форматированная строка с заголовком
 *
 * День: Понедельник 1 (название дня с заглавной буквы и число)
 * Неделя: Январь, 2024 (название месяца с заглавной буквы и год)
 * Месяц: Январь, 2024 (название месяца с заглавной буквы и год)
 */
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

/**
 * Возвращает заголовок колонки таблицы в формате "День недели Число"
 * Например: "Понедельник 1"
 * @param date - Дата в формате строки
 */
export const getTableColumnTitle = (date: string) => {
  const parsedDate = new Date(date);
  if (isNaN(parsedDate.getTime())) {
    return '';
  }

  const dayName = format(parsedDate, 'EEEE', {
    locale: ru,
  });
  return `${dayName.charAt(0).toUpperCase()}${dayName.slice(1)} ${format(parsedDate, 'd')}`;
};
