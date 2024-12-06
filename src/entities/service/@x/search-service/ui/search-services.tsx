import { useUnit } from 'effector-react';
import { createSearchServiceModel } from '../model/model';
import {
  Option,
  SearchableSelect,
} from '@/shared/ui/search-input';
import { cn } from '@/shared/lib/utils';
import {
  TService,
  useGetServices,
} from '@/entities/service';

type Props = {
  className?: string;
  model: ReturnType<typeof createSearchServiceModel>;
  onServiceClick?: (service: TService | null) => void;
};

export const SearchServices = (props: Props) => {
  const { className, model, onServiceClick } = props;

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

  const handleChangeService = (name: string) => {
    const item =
      data?.data.items.find((s) => s.name === name) ?? null;
    onServiceClick?.(item);
  };

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
      onSelect={handleChangeService}
      onValueChange={(value) => setNameEv(value)}
    />
  );
};
