import { ComponentProps } from 'react';
import { useInfinityUsers } from '../@x/search-clients/model/hooks';
import { SelectWithSearch } from '@/shared/ui/select-with-search';

type Props = {
  defaultValue?: string;
  onChange?: (value: string) => void;
  error?: string;
  dataTestId?: string;
  contentTestId?: string;
} & ComponentProps<'button'>;

export const ClientSelect = (props: Props) => {
  const {
    defaultValue,
    onChange,
    error,
    dataTestId,
    contentTestId,
  } = props;

  const { data, isLoading } = useInfinityUsers({
    limit: 999,
  });

  const clientsOptions =
    data?.map((client) => ({
      label: client.name,
      value: client.id.toString(),
    })) ?? [];

  return (
    <SelectWithSearch
      {...props}
      label="Клиент"
      options={clientsOptions}
      value={defaultValue ?? ''}
      onChange={onChange}
      isLoading={isLoading}
      error={error}
      dataTestId={dataTestId}
      contentTestId={contentTestId}
    />
  );
};
