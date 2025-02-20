import { TAppointmentCalendar } from '@/entities/appointments';
import { TableShowMode } from '../domain/table';
import {
  WeekMode,
  WeekModeHeader,
} from '../compose/week-mode';

export const useTableContent = (params: {
  calendar: TAppointmentCalendar | undefined;
  isError: boolean;
  isLoading: boolean;
  mode: TableShowMode;
}) => {
  const { calendar, isError, isLoading, mode } = params;

  if (isError || isLoading || !calendar) {
    return {
      columns: [],
    };
  }

  if (mode === 'week') {
    return {
      columns: <WeekModeHeader calendar={calendar} />,
      content: <WeekMode calendar={calendar} />,
    };
  }

  return {};
};
