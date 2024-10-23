'use client';
import {
  GET_SERVICES_QUERY,
  ServicesTable,
  TService,
} from '@/entities/service';
import { CreateServiceModal } from '@/features/services/create-service';
import { DeleteServiceModal } from '@/features/services/delete-service';
import Loader from '@/shared/ui/loader';
import { useQuery } from '@tanstack/react-query';

const getDeleteServiceButton = (
  serviceId: TService['id']
) => <DeleteServiceModal serviceId={serviceId} />;

export const ServicesList = () => {
  const { data, isLoading } = useQuery(GET_SERVICES_QUERY);

  if (isLoading) {
    return <Loader />;
  }

  //   TODO обработка ошибок
  return (
    <div className="flex flex-col gap-2">
      <div>
        <CreateServiceModal />
      </div>
      <ServicesTable
        getRemoveServiceButton={getDeleteServiceButton}
        services={data!.data}
      />
    </div>
  );
};
