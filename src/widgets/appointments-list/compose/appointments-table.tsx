import { useGetAppointmentsCalendar } from '@/entities/appointments';

export const AppointmentsTable = () => {
  const { data } = useGetAppointmentsCalendar({
    dateFrom: '2025-01-01',
    dateTo: '2025-01-31',
  });

  return <div>{JSON.stringify(data)}</div>;
};
