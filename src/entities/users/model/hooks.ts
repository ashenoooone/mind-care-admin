import { useQuery } from '@tanstack/react-query';
import { UsersService } from './users.service';

export const USERS_BASE_KEY = 'users';

export const useGetUsers = (
  params: FuncFirstParameter<typeof UsersService.getUsers>
) => {
  return useQuery({
    queryKey: [USERS_BASE_KEY, params.count, params.page],
    queryFn: () => UsersService.getUsers(params),
  });
};
