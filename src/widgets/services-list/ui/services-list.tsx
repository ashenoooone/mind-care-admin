'use client';
import {
  createServiceListParamsModel,
  ServicesTable,
  TableHeader,
  TableRow,
  useGetServices,
} from '@/entities/service';
import { CreateServiceModal } from '@/features/services/create-service';
import { DeleteServiceModal } from '@/features/services/delete-service';
import { EditServiceModal } from '@/features/services/edit-service';
import Loader from '@/shared/ui/loader';
import Pagination from '@/shared/ui/pagination';
import { TableCell } from '@/shared/ui/table';
import { useUnit } from 'effector-react';

const servicesListParamsModel =
  createServiceListParamsModel();

export const ServicesList = () => {
  const { $page, changePageEv } = useUnit(
    servicesListParamsModel
  );
  const { data, isLoading } = useGetServices({
    page: $page,
    limit: 50,
  });

  if (isLoading || !data) {
    return <Loader />;
  }

  return (
    <div className="flex flex-col gap-2">
      <div>
        <CreateServiceModal />
      </div>
      <ServicesTable
        header={<TableHeader />}
        services={data.data.items.map((service) => (
          <TableRow
            service={service}
            key={service.id}
            removeButton={
              <TableCell>
                <DeleteServiceModal
                  serviceId={service.id}
                />
              </TableCell>
            }
            editButton={
              <TableCell>
                <EditServiceModal service={service} />
              </TableCell>
            }
          />
        ))}
      />
      {data.data.meta.totalPages > 1 && (
        <Pagination
          meta={data.data.meta}
          onPageChange={(page) => changePageEv(page)}
        />
      )}
    </div>
  );
};
