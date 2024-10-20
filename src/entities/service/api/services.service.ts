import { $api } from '@/shared/api';

export class ServicesService {
  static getServices = () => {
    return $api.get('/services');
  };
}
