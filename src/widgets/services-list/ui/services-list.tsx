'use client';
import {
  ServicesTable,
  TService,
  useGetServices,
} from '@/entities/service';
import { CreateServiceModal } from '@/features/services/create-service';
import { DeleteServiceModal } from '@/features/services/delete-service';
import Loader from '@/shared/ui/loader';

const getDeleteServiceButton = (
  serviceId: TService['id']
) => <DeleteServiceModal serviceId={serviceId} />;

export const ServicesList = () => {
  const { data, isLoading } = useGetServices({});

  if (isLoading || !data) {
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
        services={data.data.items}
      />
    </div>
  );
};
