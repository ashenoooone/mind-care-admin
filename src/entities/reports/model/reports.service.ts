import { $api } from '@/shared/api';
import { TReport } from './types';
import {
  PaginationParams,
  WithPagination,
} from '@/shared/types';
export class ReportsService {
  static async getReports(params: PaginationParams) {
    const { limit = 10, page = 0 } = params;

    return $api.get<{ items: TReport[] } & WithPagination>(
      'reports',
      {
        params: {
          limit,
          page,
        },
      }
    );
  }
}
