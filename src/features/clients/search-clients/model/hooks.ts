import { USERS_BASE_KEY } from '@/entities/users';
import { UsersService } from '@/entities/users/model/users.service';
import { PaginationParams } from '@/shared/types';
import { useInfiniteQuery } from '@tanstack/react-query';

export const useInfinityUsers = (
  params: PaginationParams & { name?: string }
) => {
  const { limit = 10, page = 0, name = '' } = params;
  return useInfiniteQuery({
    queryKey: [
      USERS_BASE_KEY,
      params.limit,
      params.name,
      params.page,
    ],
    queryFn: () =>
      UsersService.getUsers({
        page,
        limit,
        name,
      }),
    initialPageParam: 0,
    getNextPageParam: (result) => result.data.meta.nextPage,
    select: (result) =>
      result.pages.map((p) => p.data.items).flat(),
  });
};
