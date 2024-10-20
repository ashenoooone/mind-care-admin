'use client';
import { CHECK_USER_QUERY_OPTIONS } from '../model/hooks';
import { ReactNode } from 'react';
import Loader from '@/shared/ui/loader';
import { useQuery } from '@tanstack/react-query';

type AuthFacadeProps = {
  children?: ReactNode;
};

const REFETCH_INTERVAL = 5 * 1000 * 60;

export const AuthFacade = (props: AuthFacadeProps) => {
  const { children } = props;

  const { isLoading } = useQuery({
    ...CHECK_USER_QUERY_OPTIONS,
    refetchInterval: REFETCH_INTERVAL,
  });

  return (
    <>
      {children}
      {isLoading && (
        <Loader className="fixed bottom-1 right-1" />
      )}
    </>
  );
};
