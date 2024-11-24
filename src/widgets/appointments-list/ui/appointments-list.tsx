'use client';

import {
  createAppointmentsFiltersModel,
  Filters,
} from '@/features/appointments/filters';
import {
  createSearchClientsModel,
  SearchClients,
} from '@/features/clients/search-clients';
import { cn } from '@/shared/lib/utils';

type Props = {
  className?: string;
};

const filtersModel = createAppointmentsFiltersModel();

const searchClientsModel = createSearchClientsModel({
  debounceTiming: 500,
});

export const AppointmentsList = (props: Props) => {
  const { className } = props;

  return (
    <div className={cn(className, 'w-full')}>
      <Filters
        model={filtersModel}
        clientsSearch={
          <SearchClients model={searchClientsModel} />
        }
        servicesSearch={undefined}
      />
    </div>
  );
};
