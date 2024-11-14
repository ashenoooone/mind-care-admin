import { useQuery } from '@tanstack/react-query';
import { ServicesService } from './services.service';

export const SERVICES_BASE_KEY = 'services';

export const useGetServices = (
  params: FuncFirstParameter<
    typeof ServicesService.getServices
  >
) => {
  return useQuery({
    queryKey: [SERVICES_BASE_KEY],
    queryFn: () => ServicesService.getServices(params),
  });
};
