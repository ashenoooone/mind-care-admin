import React from 'react';
import { useUnit } from 'effector-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import { MetricProps } from '../../model/metric-strategy';
import { useTopCancellingClients } from '../../model/hooks';
import Loader from '@/shared/ui/loader';

export const TopCancelingClients = (props: MetricProps) => {
  const { className, params } = props;
  const { $metricsParams } = useUnit(params);

  const { data, isLoading } =
    useTopCancellingClients($metricsParams);

  if (isLoading || !data) return <Loader />;

  return (
    <div className={className}>
      <BarChart
        width={600}
        height={300}
        data={data.data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="client"
          label={{
            value: 'Клиент',
            position: 'insideBottom',
            offset: -5,
          }}
        />
        <YAxis
          label={{
            value: 'Отмен',
            angle: -90,
            position: 'insideLeft',
          }}
        />
        <Tooltip />
        <Legend />
        <Bar
          dataKey="cancelledCount"
          fill="#8884d8"
          name="Cancelled Count"
        />
      </BarChart>
    </div>
  );
};
