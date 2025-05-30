import { $api } from '@/shared/api';
import { TService } from '../model/types';
import {
  PaginationParams,
  WithPaginationMeta,
} from '@/shared/types';

export class ServicesService {
  static getServices = (
    params: { name?: string } & PaginationParams
  ) => {
    const { page = 0, limit = 10, name } = params;
    return $api.get<
      { items: TService[] } & WithPaginationMeta
    >('/services', {
      params: { page, limit, name },
    });
  };

  static getService = (params: { id: TService['id'] }) => {
    return $api.get<TService>(`/services/${params.id}`);
  };

  static deleteService = (params: {
    id: TService['id'];
  }) => {
    return $api.delete(`/services/${params.id}`);
  };

  static postCreateService = (
    params: Omit<Partial<TService>, 'id'>
  ) => {
    return $api.post('/services', params);
  };

  static putUpdateService = (params: {
    id: TService['id'];
    data: Omit<Partial<TService>, 'id'>;
  }) => {
    return $api.patch(
      `/services/${params.id}`,
      params.data
    );
  };
}
