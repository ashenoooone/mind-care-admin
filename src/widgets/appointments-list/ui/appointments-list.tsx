'use client';

import { List } from '@/entities/appointments';
import { TService } from '@/entities/service';
import { TClient } from '@/entities/users';
import {
  createAppointmentsFiltersModel,
  Filters,
} from '@/features/appointments/filters';
import {
  createSearchClientsModel,
  SearchClients,
} from '@/features/clients/search-clients';
import {
  createSearchServiceModel,
  SearchServices,
} from '@/features/services/search-service';
import { cn } from '@/shared/lib/utils';
import { useUnit } from 'effector-react';

type Props = {
  className?: string;
};

const filtersModel = createAppointmentsFiltersModel();

const searchClientsModel = createSearchClientsModel({
  debounceTiming: 500,
});

const searchServicesModel = createSearchServiceModel({
  debounceTiming: 500,
});

export const AppointmentsList = (props: Props) => {
  const { className } = props;

  const [filters] = useUnit(filtersModel.filters);

  const onSetClient = (client: TClient | null) => {
    filtersModel.actions.setClientIdEv(client);
  };

  const onSetService = (service: TService | null) => {
    filtersModel.actions.setServiceIdEv(service);
  };

  return (
    <div
      className={cn(
        className,
        'w-full flex flex-col gap-4'
      )}
    >
      <Filters
        model={filtersModel}
        clientsSearch={
          <SearchClients
            onClientClick={onSetClient}
            model={searchClientsModel}
          />
        }
        servicesSearch={
          <SearchServices
            onServiceClick={onSetService}
            model={searchServicesModel}
          />
        }
      />
      <List params={filters} />
    </div>
  );
};
