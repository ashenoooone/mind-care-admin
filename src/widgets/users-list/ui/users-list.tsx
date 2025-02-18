'use client';
import {
  createUsersListParamsModel,
  TableHeader,
  TableRow,
  useGetUsers,
  UsersTable,
} from '@/entities/users';
import Loader from '@/shared/ui/loader';
import Pagination from '@/shared/ui/pagination';
import { useUnit } from 'effector-react';

const usersListParamsModel = createUsersListParamsModel();

export const UsersList = () => {
  const { $page, changePageEv } = useUnit(
    usersListParamsModel
  );

  const { data, isLoading } = useGetUsers({
    page: $page,
  });

  if (isLoading || !data) {
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
      {data?.data.meta.totalPages > 1 && (
        <Pagination
          onPageChange={(page) => changePageEv(page)}
          meta={data?.data.meta}
        />
      )}
    </div>
  );
};
