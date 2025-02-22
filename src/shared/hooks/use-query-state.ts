'use client';

import { useCallback, useEffect } from 'react';
import {
  useRouter,
  useSearchParams,
} from 'next/navigation';

export const useQueryState = <Value extends string>(
  key: string,
  defaultValue?: Value
) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (
      !searchParams.has(key) &&
      defaultValue !== undefined
    ) {
      const params = new URLSearchParams(
        searchParams.toString()
      );
      params.set(key, defaultValue);
      router.replace(`?${params.toString()}`, {
        scroll: false,
      });
    }
  }, [key, defaultValue, searchParams, router]);

  const setQueryParam = useCallback(
    (value: Value | null) => {
      const params = new URLSearchParams(
        searchParams.toString()
      );

      if (value === null) {
        params.delete(key);
      } else {
        params.set(key, value);
      }

      router.replace(`?${params.toString()}`, {
        scroll: false,
      });
    },
    [key, searchParams, router]
  );

  return [
    (searchParams.get(key) ?? defaultValue) as
      | Value
      | undefined,
    setQueryParam,
  ] as const;
};
