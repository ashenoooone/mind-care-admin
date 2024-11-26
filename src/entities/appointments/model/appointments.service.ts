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
}
