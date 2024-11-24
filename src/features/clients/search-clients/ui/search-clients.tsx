'use client';
import { TClient } from '@/entities/users';
import { useInfinityUsers } from '../model/hooks';
import { createSearchClientsModel } from '../model/model';
import { useUnit } from 'effector-react';
import {
  Option,
  SearchableSelect,
} from '@/shared/ui/search-input';
import { useMemo } from 'react';

type Props = {
  className?: string;
  onClientClick?: (client: TClient) => void;
  model: ReturnType<typeof createSearchClientsModel>;
};

export const SearchClients = (props: Props) => {
  const { className, model } = props;

  const [name] = useUnit([model.$name]);

  const {
    data,
    fetchNextPage,
    isFetchNextPageError,
    isFetchingNextPage,
  } = useInfinityUsers({ name });

  const usersOptions = useMemo<Option[]>(() => {
    return (
      data?.map((user) => ({
        label: user.name,
        value: user.name,
      })) ?? []
    );
  }, [data]);

  console.log(usersOptions);

  return (
    <SearchableSelect
      placeholder="Пользователь"
      options={usersOptions}
    />
  );
};
