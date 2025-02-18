import { useGetAppointmentsCalendar } from '@/entities/appointments';
import { useAppointmentsTable } from '../model/use-appointments-table';
import { TableLayout } from '../ui/table-layout';
import { TableHeader } from '../ui/table-header';
import { TableTitle } from '../ui/table-title';

export const AppointmentsTable = () => {
  const {
    $currentPeriod,
    $tableState,
    setShowMode,
    $title,
    controls,
  } = useAppointmentsTable();

  const { data, isLoading, isFetching, isPending } =
    useGetAppointmentsCalendar({
      dateFrom: $currentPeriod.fromDate,
      dateTo: $currentPeriod.toDate,
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
      content={null}
    />
  );
};
