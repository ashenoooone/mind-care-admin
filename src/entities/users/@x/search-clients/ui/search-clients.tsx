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
  onClientClick?: (client: TClient | null) => void;
  model: ReturnType<typeof createSearchClientsModel>;
};

export const SearchClients = (props: Props) => {
  const { className, model, onClientClick } = props;

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

  const handleChangeClient = (name: string) => {
    const item = data?.find((u) => u.name === name) ?? null;
    onClientClick?.(item);
  };

  return (
    <SearchableSelect
      className={cn(
        className,
        'max-h-[200px] overflow-auto'
      )}
      isLoading={isLoadingCombined}
      placeholder="Пользователь"
      options={usersOptions}
      onSelect={handleChangeClient}
      searchValue={$name}
      onValueChange={(value) => setNameEv(value)}
    />
  );
};
