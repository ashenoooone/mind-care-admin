'use client';
import {
  Table,
  TableHeader,
  TableRow,
} from '@/entities/reports';
import { useGetReportsQuery } from '@/entities/reports/model/hooks';
import Loader from '@/shared/ui/loader';

export const ReportsList = () => {
  const { data, isError, isLoading } = useGetReportsQuery(
    {}
  );

  if (isLoading || isError || !data?.data) {
    return <Loader />;
  }

  return (
    <div>
      <Table
        header={<TableHeader />}
        reports={data?.data.items.map((report) => (
          <TableRow report={report} key={report.id} />
        ))}
      />
    </div>
  );
};
