import React from 'react';
import { useAppointmentsReport } from '../model/hooks';
import { GetMetricDto } from '../model/types';
import Loader from '@/shared/ui/loader';

type Props = {
  className?: string;
  params: GetMetricDto;
};

export const AppointmentsMetrics = ({
  className,
  params,
}: Props) => {
  const { data, isLoading } = useAppointmentsReport(params);

  if (!data || isLoading) return <Loader />;

  const {
    totalProfit,
    totalLoss,
    plannedProfit,
    counts,
    totalHours,
    totalMinutes,
  } = data.data;

  return (
    <div
      className={`p-4 bg-white shadow rounded-lg ${className}`}
    >
      <h2 className="text-lg font-bold text-gray-700 mb-4">
        Отчет по записям
      </h2>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-600">
            Общая прибыль
          </h3>
          <p className="text-xl font-bold text-green-600">
            {totalProfit} ₽
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-600">
            Общие потери
          </h3>
          <p className="text-xl font-bold text-red-600">
            {totalLoss} ₽
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-gray-600">
            Планируемая прибыль
          </h3>
          <p className="text-xl font-bold text-blue-600">
            {plannedProfit} ₽
          </p>
        </div>
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
    </div>
  );
};
