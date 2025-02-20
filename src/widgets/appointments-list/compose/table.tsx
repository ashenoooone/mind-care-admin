'use client';

import { useGetAppointmentsCalendar } from '@/entities/appointments';
import { useAppointmentsTable } from '../model/use-table';
import { TableLayout } from '../ui/table-layout';
import { TableHeader } from '../ui/table-header';
import { TableTitle } from '../ui/table-title';
import { useTableContent } from '../model/use-table-content';

export const AppointmentsTable = () => {
  const {
    $currentPeriod,
    $tableState,
    setShowMode,
    $title,
    controls,
  } = useAppointmentsTable();

  const {
    data,
    isLoading,
    isFetching,
    isPending,
    isError,
  } = useGetAppointmentsCalendar({
    dateFrom: $currentPeriod.fromDate,
    dateTo: $currentPeriod.toDate,
  });

  const { columns, content } = useTableContent({
    calendar: data,
    isError,
    isLoading: isLoading || isFetching || isPending,
    mode: $tableState.showMode,
  });

  return (
    <TableLayout
      header={
        <TableHeader
          value={$tableState.showMode}
          onChange={setShowMode}
        />
      }
      title={
        <TableTitle title={$title} controls={controls} />
      }
      columns={columns}
      content={content}
    />
  );
};
