import {
  queryOptions,
  useQuery,
} from '@tanstack/react-query';
import { ServicesService } from './services.service';

export const SERVICES_BASE_KEY = 'services';
export const GET_SERVICES_QUERY = queryOptions({
  queryKey: [SERVICES_BASE_KEY],
});
export const useGetServices = (
  params: FuncFirstParameter<
    typeof ServicesService.getServices
  >
) => {
  return useQuery({
    queryKey: [
      SERVICES_BASE_KEY,
      params.limit,
      params.name,
      params.page,
    ],
    queryFn: () => ServicesService.getServices(params),
  });
};
