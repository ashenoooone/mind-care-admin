import { useUnit } from 'effector-react';
import { createSearchServiceModel } from '../model/model';
import {
  Option,
  SearchableSelect,
} from '@/shared/ui/search-input';
import { cn } from '@/shared/lib/utils';
import { useGetServices } from '@/entities/service';

type Props = {
  className?: string;
  model: ReturnType<typeof createSearchServiceModel>;
};

export const SearchServices = (props: Props) => {
  const { className, model } = props;

  const { $name, setNameEv, $debouncedName } =
    useUnit(model);

  const { data, isFetching, isLoading } = useGetServices({
    name: $debouncedName,
    limit: 50,
  });

  const isLoadingCombined = isFetching || isLoading;

  const servicesOptions: Option[] =
    data?.data.items.map((service) => ({
      label: service.name,
      value: service.name,
    })) ?? [];

  return (
    <SearchableSelect
      className={cn(
        className,
        'max-h-[200px] overflow-auto'
      )}
      isLoading={isLoadingCombined}
      placeholder="Услуга"
      options={servicesOptions}
      searchValue={$name}
      onValueChange={(value) => setNameEv(value)}
    />
  );
};
