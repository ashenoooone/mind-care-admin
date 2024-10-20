'use client';
import {
  GET_SERVICES_QUERY,
  ServicesTable,
} from '@/entities/service';
import Loader from '@/shared/ui/loader';
import { useQuery } from '@tanstack/react-query';

export const ServicesList = () => {
  const { data, isLoading } = useQuery(GET_SERVICES_QUERY);

  if (isLoading) {
    return <Loader />;
  }

  //   TODO обработка ошибок
  return <ServicesTable services={data?.data} />;
};
