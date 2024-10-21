/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';
import { useGetUsers, UsersTable } from '@/entities/users';
import Loader from '@/shared/ui/loader';

export const UsersList = () => {
  const { data, isLoading } = useGetUsers({
    page: 1,
    count: 10,
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      {/* TODO fixme */}
      {/* @ts-expect-error */}
      <UsersTable users={data?.data.clients ?? []} />
    </div>
  );
};
