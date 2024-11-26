import { useQuery } from '@tanstack/react-query';
import { AppointmentsService } from './appointments.service';

const APPOINTMENTS_BASE_KEY = 'appointments';

export const useGetAppointments = (
  params: FuncFirstParameter<
    typeof AppointmentsService.getAppointments
  >
) =>
  useQuery({
    queryKey: [
      APPOINTMENTS_BASE_KEY,
      ...Object.values(params),
    ],
    queryFn: () =>
      AppointmentsService.getAppointments(params),
  });
