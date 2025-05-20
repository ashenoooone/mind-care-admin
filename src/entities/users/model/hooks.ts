import { useQuery } from '@tanstack/react-query';
import { UsersService } from './users.service';

export const USERS_BASE_KEY = 'users';

export const useGetUsers = (
  params: FuncFirstParameter<typeof UsersService.getUsers>
) => {
  return useQuery({
    queryKey: [
      USERS_BASE_KEY,
      params.limit,
      params.page,
      params.name,
      params.telegramNickname,
    ],
    queryFn: () => UsersService.getUsers(params),
  });
};

export const useGetUser = (id: number) => {
  return useQuery({
    queryKey: [USERS_BASE_KEY, id],
    enabled: !!id,
    select: (data) => data.data,
    queryFn: () => UsersService.getUser(id),
  });
};

export const useGetUserExtended = (
  id: number | undefined
) => {
  return useQuery({
    queryKey: [USERS_BASE_KEY, id],
    enabled: !!id,
    select: (data) => data.data,
    queryFn: () => UsersService.getUserExtended(id!),
  });
};
