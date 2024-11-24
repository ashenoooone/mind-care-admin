'use client';
import { TClient } from '@/entities/users';
import { useInfinityUsers } from '../model/hooks';
import { createSearchClientsModel } from '../model/model';
import { useUnit } from 'effector-react';
import {
  Option,
  SearchableSelect,
} from '@/shared/ui/search-input';
import { cn } from '@/shared/lib/utils';

type Props = {
  className?: string;
  onClientClick?: (client: TClient) => void;
  model: ReturnType<typeof createSearchClientsModel>;
};

export const SearchClients = (props: Props) => {
  const { className, model } = props;

  const { $name, $debouncedName, setNameEv } =
    useUnit(model);

  const {
    data,
    isFetchingNextPage,
    isLoading,
    isFetching,
  } = useInfinityUsers({ name: $debouncedName, limit: 50 });

  const usersOptions: Option[] =
    data?.map((item) => ({
      value: item.name,
      label: item.name,
    })) ?? [];

  const isLoadingCombined =
    isFetchingNextPage || isFetching || isLoading;

  return (
    <SearchableSelect
      className={cn(
        className,
        'max-h-[200px] overflow-auto'
      )}
      isLoading={isLoadingCombined}
      placeholder="Пользователь"
      options={usersOptions}
      searchValue={$name}
      onValueChange={(value) => setNameEv(value)}
    />
  );
};
