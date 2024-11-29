import { $api } from '@/shared/api';
import {
  PaginationParams,
  WithPaginationMeta,
} from '@/shared/types';
import { TAppointment } from './types';

export class AppointmentsService {
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
}
