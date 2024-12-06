import React from 'react';
import { useUnit } from 'effector-react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';
import Loader from '@/shared/ui/loader';
import { MetricProps } from '../../model/metric-strategy';
import { useRevenueShareByService } from '../../model/hooks';

export const RevenueByService = (props: MetricProps) => {
  const { className, params } = props;

  const { $metricsParams } = useUnit(params);
  const { data, isLoading } =
    useRevenueShareByService($metricsParams);

  if (isLoading || !data) return <Loader />;

  // Цветовая палитра для графика
  const COLORS = [
    '#0088FE',
    '#00C49F',
    '#FFBB28',
    '#FF8042',
    '#FF6384',
  ];

  return (
    <div className={className}>
      <h3>Соотношение выручки по сервисам</h3>
      <PieChart width={400} height={400}>
        <Pie
          data={data.data}
          dataKey="percentage"
          nameKey="serviceName"
          cx="50%"
          cy="50%"
          outerRadius={150}
          fill="#8884d8"
          label={({ name, value }) => `${name}: ${value}%`}
        >
          {data.data.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </div>
  );
};
