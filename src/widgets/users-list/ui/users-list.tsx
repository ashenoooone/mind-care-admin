'use client';

import {
  TableHeader,
  TableRow,
  useGetUsers,
  UsersTable,
} from '@/entities/users';
import Loader from '@/shared/ui/loader';
import Pagination from '@/shared/ui/pagination';
import { useUnit } from 'effector-react';
import { createUsersFiltersModel } from '../model/filters.model';
import { UsersFilters } from './filters';

const usersFiltersModel = createUsersFiltersModel();

export const UsersList = () => {
  const filters = useUnit(usersFiltersModel.$filters);
  const { data } = useGetUsers(filters);

  if (!data) {
    return <Loader />;
  }

  return (
    <div>
      <UsersFilters
        model={usersFiltersModel}
        className="mb-4"
      />
      <UsersTable
        header={<TableHeader />}
        users={data?.data.items.map((user) => (
          <TableRow user={user} key={user.id} />
        ))}
      />
      {data?.data.meta.totalPages > 1 && (
        <Pagination
          onPageChange={(page) => {
            usersFiltersModel.actions.setPageEv(page);
          }}
          meta={data?.data.meta}
        />
      )}
    </div>
  );
};
