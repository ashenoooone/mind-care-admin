import { $api } from '@/shared/api';
import { TService } from '../model/types';

export class ServicesService {
  static getServices = () => {
    return $api.get<TService[]>('/services');
  };

  static postCreateService = (
    params: Omit<Partial<TService>, 'id'>
  ) => {
    return $api.post('services', params);
  };
}
