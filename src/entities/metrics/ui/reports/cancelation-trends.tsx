import { useUnit } from 'effector-react';
import { MetricProps } from '../../model/metric-strategy';
import { TIntervalTypeDayWeek } from '../../model/types';
import { Loader } from 'lucide-react';
import { useCancellationTrends } from '../../model/hooks';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from 'recharts';
export const CancellationTrends = (props: MetricProps) => {
  const { className, params } = props;

  const { $metricsParams, $interval } = useUnit(params);
  const { data, isLoading } = useCancellationTrends(
    $metricsParams,
    $interval! as TIntervalTypeDayWeek
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
