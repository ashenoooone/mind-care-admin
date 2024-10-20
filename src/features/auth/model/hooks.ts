import { mutationOptions } from '@/shared/lib/mutation-options';
import { AuthService } from '../api/auth.service';
import { queryOptions } from '@tanstack/react-query';
import { LocalStorageManager } from '@/shared/lib/local-storage-manager';
import { handleUnauthorized } from '@/shared/api/utils';

// check user
export const CHECK_USER_QUERY_OPTIONS = queryOptions({
  queryFn: () => {
    const token =
      LocalStorageManager.getItem<string>('token');
    if (token === null) handleUnauthorized();
    return AuthService.checkUser();
  },
  queryKey: ['user'],
});

// login
export const LOGIN_MUTATION_OPTIONS = mutationOptions<
  typeof AuthService.login
>({
  mutationKey: ['login'],
  mutationFn: (params) => AuthService.login(params),
});
