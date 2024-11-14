/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';
import {
  TableHeader,
  TableRow,
  useGetUsers,
  UsersTable,
} from '@/entities/users';
import Loader from '@/shared/ui/loader';

export const UsersList = () => {
  const { data, isLoading } = useGetUsers({
    page: 0,
    limit: 10,
  });

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <UsersTable
        header={<TableHeader />}
        users={data?.data.items.map((user) => (
          <TableRow user={user} key={user.id} />
        ))}
      />
    </div>
  );
};
