import { $api } from '@/shared/api';
import { TService } from '../model/types';

export class ServicesService {
  static getServices = () => {
    return $api.get<TService[]>('/services');
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
