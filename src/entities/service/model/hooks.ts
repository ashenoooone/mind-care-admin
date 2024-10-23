import { queryOptions } from '@tanstack/react-query';
import { ServicesService } from './services.service';

export const SERVICES_BASE_KEY = 'services';
// get service
export const GET_SERVICES_QUERY = queryOptions({
  queryKey: [SERVICES_BASE_KEY],
  queryFn: () => ServicesService.getServices(),
});
