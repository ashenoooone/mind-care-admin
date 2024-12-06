import React from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
} from 'recharts';
import Loader from '@/shared/ui/loader';
import { useUnit } from 'effector-react';
import { Money } from '@/shared/ui/money';
import { MetricProps } from '../../model/metric-strategy';
import { useAppointmentsReport } from '../../model/hooks';

const COLORS = ['#4caf50', '#f44336', '#2196f3']; // Зеленый, красный, синий

export const AppointmentsMetrics = ({
  className,
  params,
}: MetricProps) => {
  const { $metricsParams } = useUnit(params);
  const { data, isLoading } =
    useAppointmentsReport($metricsParams);

  if (!data || isLoading) return <Loader />;

  const {
    totalProfit,
    totalLoss,
    plannedProfit,
    counts,
    totalHours,
    totalMinutes,
  } = data.data;

  const chartData = [
    { name: 'Общая прибыль', value: totalProfit },
    { name: 'Общие потери', value: totalLoss },
    { name: 'Планируемая прибыль', value: plannedProfit },
  ];

  return (
    <div
      className={`p-4 bg-white shadow rounded-lg ${className}`}
    >
      <h2 className="text-lg font-bold text-gray-700 mb-4">
        Отчет по записям
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-1">
          <Money>Общая прибыль {totalProfit}</Money>
          <Money variant="red">
            Общие потери {totalLoss}
          </Money>
          <Money variant="blue">
            Планируемая прибыль {plannedProfit}
          </Money>
        </div>
        <div>
          <div>
            <h3 className="text-sm font-semibold text-gray-600">
              Всего часов
            </h3>
            <p className="text-xl font-bold text-gray-800">
              {totalHours} ч {totalMinutes} мин
            </p>
          </div>
          <div className="col-span-2">
            <h3 className="text-sm font-semibold text-gray-600 mb-2">
              Статусы записей
            </h3>
            <div className="space-y-1">
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Завершенные:
                </span>
                <span className="font-bold text-gray-800">
                  {counts.COMPLETED}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Отмененные:
                </span>
                <span className="font-bold text-gray-800">
                  {counts.CANCELLED}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">
                  Запланированные:
                </span>
                <span className="font-bold text-gray-800">
                  {counts.SCHEDULED}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="col-span-2 mt-4">
          <h3 className="text-sm font-semibold text-gray-600 mb-2">
            Распределение прибыли и потерь
          </h3>
          <PieChart width={400} height={300}>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              label
            >
              {chartData.map((entry, index) => (
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
      </div>
    </div>
  );
};
