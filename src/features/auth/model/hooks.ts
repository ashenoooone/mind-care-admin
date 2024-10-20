import { mutationOptions } from '@/shared/lib/mutation-options';
import { AuthService } from '../api/auth.service';
import { queryOptions } from '@tanstack/react-query';

// check user
export const CHECK_USER_QUERY_OPTIONS = queryOptions({
  queryFn: () => AuthService.checkUser(),
  queryKey: ['user'],
});

// login
export const LOGIN_MUTATION_OPTIONS = mutationOptions<
  typeof AuthService.login
>({
  mutationKey: ['login'],
  mutationFn: (params) => AuthService.login(params),
});
