import { useQueryClient } from 'react-query';

/**
 * Хук для получения данных из кеша react-query.
 *
 * @template T - Тип данных, которые будут получены из кеша.
 *
 * @param {string | string[]} queryKey - Ключ запроса, по которому ищутся данные в кеша.
 * @returns {T | undefined} - Возвращает данные из кеша или `undefined`, если данные не найдены.
 */
export const useGetDataFromCache = <T>(
  queryKey: string[] | string
): T | undefined => {
  const queryClient = useQueryClient();

  const cachedData = queryClient.getQueryData<T>(queryKey);

  return cachedData;
};
