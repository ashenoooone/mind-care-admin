'use client';
import { useCheckUser } from '../model/hooks';
import { ReactNode, useEffect } from 'react';
import Loader from '@/shared/ui/loader';
import { useRouter } from 'next/navigation';
import { ROUTES } from '@/shared/config/router-config';

type AuthFacadeProps = {
  children?: ReactNode;
};

export const AuthFacade = (props: AuthFacadeProps) => {
  const { children } = props;
  const { isLoading, isError } = useCheckUser();

  const router = useRouter();

  useEffect(() => {
    if (isError) {
      router.push(ROUTES.login);
    }
  }, [isError, router]);

  return (
    <>
      {children}
      {isLoading && (
        <Loader className="fixed bottom-1 right-1" />
      )}
    </>
  );
};
