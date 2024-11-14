import { $api } from '@/shared/api';
import { TService } from '../model/types';
import {
  PaginationParams,
  WithPagination,
} from '@/shared/types';

export class ServicesService {
  static getServices = (params: PaginationParams) => {
    const { page = 0, limit = 10 } = params;
    return $api.get<{ items: TService[] } & WithPagination>(
      '/services',
      {
        params: { page, limit },
      }
    );
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
}
