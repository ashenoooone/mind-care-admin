import { useQuery, UseQueryOptions } from 'react-query';
import { AuthService } from '../api/auth.service';
import { TUser } from './types';

export const CHECK_USER_QUERY_OPTIONS: UseQueryOptions<
  TUser,
  Error
> = {
  queryFn: () => AuthService.checkUser(),
  queryKey: ['user'],
};

export const useCheckUser = () => {
  return useQuery(CHECK_USER_QUERY_OPTIONS);
};
