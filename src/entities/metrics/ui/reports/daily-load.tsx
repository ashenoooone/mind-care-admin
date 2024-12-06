import { useUnit } from 'effector-react';
import {
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
  LineChart,
} from 'recharts';
import { useDailyLoad } from '../../model/hooks';
import { MetricProps } from '../../model/metric-strategy';
import Loader from '@/shared/ui/loader';

export const DailyLoad = (props: MetricProps) => {
  const { className, params } = props;
  const { $metricsParams } = useUnit(params);
  const { data, isLoading } = useDailyLoad($metricsParams);

  if (isLoading || !data) return <Loader />;

  return (
    <div className={className}>
      <LineChart
        width={600}
        height={300}
        data={data.data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="averageLoadMinutes"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </div>
  );
};
