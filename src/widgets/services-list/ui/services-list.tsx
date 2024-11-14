'use client';
import {
  ServicesTable,
  TableHeader,
  TableRow,
  useGetServices,
} from '@/entities/service';
import { CreateServiceModal } from '@/features/services/create-service';
import { DeleteServiceModal } from '@/features/services/delete-service';
import Loader from '@/shared/ui/loader';
import { TableCell } from '@/shared/ui/table';

export const ServicesList = () => {
  const { data, isLoading } = useGetServices({});

  if (isLoading || !data) {
    return <Loader />;
  }

  //   TODO обработка ошибок
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
          />
        ))}
      />
    </div>
  );
};
