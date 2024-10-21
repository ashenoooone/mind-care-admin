import { $api } from '@/shared/api';
import { TClient } from './types';
export class UsersService {
  static getUsers = (params: WithPaginationParams) => {
    return $api.get<PaginatedResult<TClient[]>>('clients', {
      params,
    });
  };
}
