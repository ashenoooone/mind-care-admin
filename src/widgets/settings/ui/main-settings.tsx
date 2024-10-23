'use client';
import { GET_SETTINGS_QUERY_OPTIONS } from '@/entities/settings';
import { UpdateSettingsForm } from '@/features/settings/updateSettings';
import Loader from '@/shared/ui/loader';
import { useQuery } from '@tanstack/react-query';

export const MainSettings = () => {
  const { data, isLoading } = useQuery(
    GET_SETTINGS_QUERY_OPTIONS
  );

  if (isLoading || !data || !data.data[0]) {
    return <Loader />;
  }

  return <UpdateSettingsForm settings={data.data[0]} />;
};
