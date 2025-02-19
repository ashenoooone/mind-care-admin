import { TService } from '@/entities/service/@x/appointments';
import { TClient } from '@/entities/users/@x/appointments';

export type TAppointment = {
  id: number;
  clientId: number;
  client: TClient;
  serviceId: number;
  service: TService;
  startTime: string;
  endTime: string;
  status: AppointmentStatus;
};

export enum AppointmentStatus {
  SCHEDULED = 'SCHEDULED',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
}

export const appointmentStatusMapper: Record<
  AppointmentStatus,
  string
> = {
  [AppointmentStatus.CANCELLED]: 'Отменено',
  [AppointmentStatus.COMPLETED]: 'Завершено',
  [AppointmentStatus.SCHEDULED]: 'Запланированно',
};

export type TAppointmentCalendar = {
  [key: string]: TAppointment[];
};
