'use client';
import {
  GET_SERVICES_QUERY,
  ServicesTable,
} from '@/entities/service';
import { CreateServiceModal } from '@/features/services';
import Loader from '@/shared/ui/loader';
import { useQuery } from '@tanstack/react-query';

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
      <ServicesTable services={data!.data} />
    </div>
  );
};
