import {
  SERVICES_BASE_KEY,
  ServicesService,
} from '@/entities/service';
import { mutationOptions } from '@/shared/lib/mutation-options';
import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query';

// update service
export const UPDATE_SERVICE_MUTATION = mutationOptions<
  typeof ServicesService.putUpdateService
>({
  mutationFn: (params) =>
    ServicesService.putUpdateService(params),
});

export const usePutUpdateService = (param?: {
  onSuccess?: () => void;
}) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    ...UPDATE_SERVICE_MUTATION,
    onSuccess: async () => {
      queryClient.invalidateQueries({
        queryKey: [SERVICES_BASE_KEY],
      });
      param?.onSuccess?.();
    },
  });

  return mutation;
};
