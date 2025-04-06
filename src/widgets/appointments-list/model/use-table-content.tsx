import { TAppointmentCalendar } from '@/entities/appointments';
import { TableShowMode } from '../domain/table';
import {
  WeekMode,
  WeekModeHeader,
} from '../compose/week-mode';
import { DayMode } from '../compose/day-mode';
import {
  MonthMode,
  MonthModeHeader,
} from '../compose/month-mode';
import Loader from '@/shared/ui/loader';

export const useTableContent = (params: {
  calendar: TAppointmentCalendar | undefined;
  isError: boolean;
  isLoading: boolean;
  mode: TableShowMode;
}) => {
  const { calendar, isError, isLoading, mode } = params;

  if (isError || isLoading || !calendar) {
    return {
      content: <Loader className="mx-auto" />,
    };
  }

  if (mode === 'week') {
    return {
      columns: <WeekModeHeader calendar={calendar} />,
      content: <WeekMode calendar={calendar} />,
    };
  }

  if (mode === 'day') {
    return {
      columns: null,
      content: <DayMode calendar={calendar} />,
    };
  }

  if (mode === 'month') {
    return {
      columns: <MonthModeHeader />,
      content: <MonthMode calendar={calendar} />,
    };
  }

  return {};
};
