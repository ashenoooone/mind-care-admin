import {
  queryOptions,
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';
import { ServicesService } from './services.service';
import { mutationOptions } from '@/shared/lib/mutation-options';
import { TService } from '../model/types';
import { AxiosResponse } from 'axios';

export const SERVICES_BASE_KEY = 'services';
// get service
export const GET_SERVICES_QUERY = queryOptions({
  queryKey: [SERVICES_BASE_KEY],
  queryFn: () => ServicesService.getServices(),
});
// create service
export const CREATE_SERVICE_MUTATION = mutationOptions<
  typeof ServicesService.postCreateService
>({
  mutationFn: (params) =>
    ServicesService.postCreateService(params),
});

export const usePostCreateService = (param?: {
  onSuccess?: () => void;
}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...CREATE_SERVICE_MUTATION,

    onMutate: async (service) => {
      await queryClient.cancelQueries({
        queryKey: [SERVICES_BASE_KEY],
      });

      const prevServices:
        | AxiosResponse<TService[]>
        | undefined = queryClient.getQueryData([
        SERVICES_BASE_KEY,
      ]);

      queryClient.setQueryData(
        [SERVICES_BASE_KEY],
        (old: AxiosResponse<TService[]>) => ({
          ...old,
          data: [...old.data, service],
        })
      );

      return prevServices;
    },
    onError: async (err, service, context) => {
      queryClient.setQueryData(
        [SERVICES_BASE_KEY],
        context
      );
    },
    onSuccess: async () => {
      queryClient.invalidateQueries(GET_SERVICES_QUERY);
      param?.onSuccess?.();
    },
  });

  return mutation;
};
