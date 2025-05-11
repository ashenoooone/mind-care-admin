import {
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import { AppointmentsService } from './appointments.service';
import { mutationOptions } from '@/shared/lib/mutation-options';
import { TAppointment } from './types';
import { USERS_BASE_KEY } from '@/entities/users/@x/appointments';

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

export const CREATE_APPOINTMENTS_MUTATION_OPTIONS =
  mutationOptions<
    typeof AppointmentsService.createAppointment
  >({
    mutationKey: ['create-appointments'],
    mutationFn: (data) =>
      AppointmentsService.createAppointment(data),
  });

export const useCreateAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    ...CREATE_APPOINTMENTS_MUTATION_OPTIONS,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [APPOINTMENTS_BASE_KEY],
      });
      queryClient.invalidateQueries({
        queryKey: [USERS_BASE_KEY],
      });
    },
  });
};

export const usePatchAppointment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ['patch-appointments'],
    mutationFn: (
      params: { id: number } & Partial<TAppointment>
    ) => AppointmentsService.patchAppointment(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [APPOINTMENTS_BASE_KEY],
      });
      queryClient.invalidateQueries({
        queryKey: [USERS_BASE_KEY],
      });
    },
  });
};

export const useGetAppointmentsCalendar = (
  params: FuncFirstParameter<
    typeof AppointmentsService.getAppointmentsCalendar
  >
) =>
  useQuery({
    queryKey: [
      APPOINTMENTS_BASE_KEY,
      ...Object.values(params),
    ],
    select: (data) => data.data,
    queryFn: () =>
      AppointmentsService.getAppointmentsCalendar(params),
  });

export const useGetAppointment = (
  id: number | undefined
) => {
  return useQuery({
    queryKey: [APPOINTMENTS_BASE_KEY, id],
    queryFn: () => AppointmentsService.getAppointment(id!),
    select: (data) => data.data,
    enabled: !!id,
  });
};
