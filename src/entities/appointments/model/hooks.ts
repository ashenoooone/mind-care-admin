import { useQuery } from '@tanstack/react-query';
import { AppointmentsService } from './appointments.service';
import { mutationOptions } from '@/shared/lib/mutation-options';

export const APPOINTMENTS_BASE_KEY = 'appointments';

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

export const PATCH_APPOINTMENTS_MUTATION_OPTIONS =
  mutationOptions<
    typeof AppointmentsService.patchAppointment
  >({
    mutationKey: ['patch-appointments'],
    mutationFn: (params) =>
      AppointmentsService.patchAppointment(params),
  });
