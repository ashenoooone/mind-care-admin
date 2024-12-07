import { useUnit } from 'effector-react';
import { MetricProps } from '../../model/metric-strategy';
import { useRevenueOverTime } from '../../model/hooks';
import { TIntervalTypeDayWeek } from '../../model/types';
import Loader from '@/shared/ui/loader';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

export const RevenueOverTime = (props: MetricProps) => {
  const { className, params } = props;
  const { $interval, $metricsParams } = useUnit(params);

  const { data, isLoading } = useRevenueOverTime(
    $metricsParams,
    $interval! as TIntervalTypeDayWeek
  );

  if (!data || isLoading) return <Loader />;

  return (
    <div
      className={`${className} p-4 bg-white rounded shadow`}
    >
      <h2 className="text-xl font-semibold mb-4">
        Revenue Over Time
      </h2>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={data.data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="period" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="revenue"
            stroke="#8884d8"
            strokeWidth={2}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
