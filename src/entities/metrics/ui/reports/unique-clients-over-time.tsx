import { useUnit } from 'effector-react';
import { useUniqueClientsOverTime } from '../../model/hooks';
import { MetricProps } from '../../model/metric-strategy';
import { TIntervalTypeWeekMonth } from '../../model/types';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
import Loader from '@/shared/ui/loader';

export const UniqueClientsOverTime = (
  props: MetricProps
) => {
  const { className, params } = props;

  const { $metricsParams, $interval } = useUnit(params);
  const { data, isLoading } = useUniqueClientsOverTime(
    $metricsParams,
    $interval! as TIntervalTypeWeekMonth
  );

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
        <XAxis dataKey="period" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="count"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </div>
  );
};
