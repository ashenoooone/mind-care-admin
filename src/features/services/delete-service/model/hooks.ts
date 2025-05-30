import {
  GET_SERVICES_QUERY,
  ServicesService,
} from '@/entities/service';
import { mutationOptions } from '@/shared/lib/mutation-options';
import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

export const DELETE_SERVICE_MUTATION = mutationOptions<
  typeof ServicesService.deleteService
>({
  mutationFn: (params) =>
    ServicesService.deleteService(params),
});

export const useDeleteServiceMutation = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...DELETE_SERVICE_MUTATION,

    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: GET_SERVICES_QUERY.queryKey,
      });
    },
  });

  return mutation;
};
