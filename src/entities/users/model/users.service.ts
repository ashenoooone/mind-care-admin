import { $api } from '@/shared/api';
import { TClient } from './types';
import {
  PaginationParams,
  WithPaginationMeta,
} from '@/shared/types';
import { TAppointment } from '@/entities/appointments';

export class UsersService {
  static getUsers = (
    params: { name?: string } & PaginationParams
  ) => {
    return $api.get<
      { items: TClient[] } & WithPaginationMeta
    >('users', {
      params,
    });
  };

  static getUser = (id: number) => {
    return $api.get<TClient>(`users/${id}`);
  };

  static getUserExtended = (id: number) => {
    return $api.get<
      TClient & { appointments: TAppointment[] }
    >(`users/${id}?type=extended`);
  };
}
