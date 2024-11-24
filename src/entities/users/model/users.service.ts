import { $api } from '@/shared/api';
import { TClient } from './types';
import {
  PaginationParams,
  WithPagination,
} from '@/shared/types';
export class UsersService {
  static getUsers = (
    params: { name?: string } & PaginationParams
  ) => {
    return $api.get<{ items: TClient[] } & WithPagination>(
      'users',
      {
        params,
      }
    );
  };
}
