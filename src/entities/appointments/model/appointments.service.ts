import { $api } from '@/shared/api';
import {
  PaginationParams,
  WithPaginationMeta,
} from '@/shared/types';
import {
  TAppointment,
  TAppointmentCalendar,
} from './types';
import { CreateAppointmentForm } from '../ui/form';

export class AppointmentsService {
  static async getAppointment(id: number) {
    await new Promise((resolve) =>
      setTimeout(resolve, 1000)
    );
    return $api.get<TAppointment>(`appointments/${id}`);
  }

  static getAppointments(
    params: PaginationParams & object
  ) {
    return $api.get<
      WithPaginationMeta & { items: TAppointment[] }
    >('appointments', {
      params,
    });
  }

  static patchAppointment(
    params: { id: number } & Partial<TAppointment>
  ) {
    const { client, service, ...rest } = params;

    return $api.patch<TAppointment>(
      `appointments/${params.id}`,
      rest
    );
  }

  static deleteAppointment(id: number) {
    return $api.delete<TAppointment>(`appointments/${id}`);
  }

  static createAppointment(data: CreateAppointmentForm) {
    return $api.post<TAppointment>('appointments', data);
  }

  static getAppointmentsCalendar(params: {
    dateFrom: string;
    dateTo: string;
  }) {
    return $api.get<TAppointmentCalendar>(
      'appointments/calendar',
      {
        params,
      }
    );
  }
}
