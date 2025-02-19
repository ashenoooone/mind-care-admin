'use client';

import { useGetAppointmentsCalendar } from '@/entities/appointments';
import { useAppointmentsTable } from '../model/use-appointments-table';
import { TableLayout } from '../ui/table-layout';
import { TableHeader } from '../ui/table-header';
import { TableTitle } from '../ui/table-title';
import { useMemo } from 'react';
import { DayMode } from './day-mode';
import { WeekMode } from './week-mode';
import { MonthMode } from './month-mode';

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

  const content = useMemo(() => {
    if (isLoading || isFetching || isPending) {
      return <div>Loading...</div>;
    }

    if (isError) {
      return <div>Error</div>;
    }

    switch ($tableState.showMode) {
      case 'day':
        return <DayMode />;
      case 'week':
        return <WeekMode calendar={data} />;
      case 'month':
        return <MonthMode />;
    }
  }, [
    $tableState.showMode,
    data,
    isFetching,
    isLoading,
    isPending,
    isError,
  ]);

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
      content={content}
    />
  );
};
