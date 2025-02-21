import { useGetServices } from '../model/hooks';
import { SelectWithSearch } from '@/shared/ui/select-with-search';

type Props = {
  defaultValue?: string;
  onChange?: (value: string) => void;
  error?: string;
};

export const ServiceSelect = (props: Props) => {
  const { defaultValue, onChange, error } = props;

  const { data, isLoading } = useGetServices({
    limit: 999,
  });

  const servicesOptions =
    data?.data.items.map((service) => ({
      label: service.name,
      value: service.id.toString(),
    })) ?? [];

  return (
    <SelectWithSearch
      label="Услуга"
      options={servicesOptions}
      value={defaultValue ?? ''}
      onChange={onChange}
      isLoading={isLoading}
      error={error}
    />
  );
};
