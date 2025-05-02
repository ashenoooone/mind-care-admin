import { WithPaginationMeta } from '@/shared/types';

/**
 * Делит массив элементов на страницы и возвращает порцию данных
 * с метаинформацией о пагинации.
 * @example
 * const data = [1, 2, 3, 4, 5];
 * const result = paginate(data, 0, 2);
 * // result.items => [1, 2]
 * // result.meta.totalPages => 3
 */
export function paginate<T>(
  items: T[],
  page: number = 0,
  limit: number = 10
): { items: T[] } & WithPaginationMeta {
  const totalItems = items.length;
  const totalPages = Math.ceil(totalItems / limit);

  const paginatedItems = items.slice(
    page * limit,
    (page + 1) * limit
  );

  return {
    items: paginatedItems,
    meta: {
      currentPage: page,
      nextPage: page + 1 < totalPages ? page + 1 : null,
      prevPage: page > 0 ? page - 1 : null,
      totalItems,
      totalPages,
    },
  };
}
