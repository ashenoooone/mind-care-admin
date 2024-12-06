'use client';
import { useUnit } from 'effector-react';
import { createChooseMetricsModel } from '../model/choose-metrics.model';
import { ChooseMetrics } from './choose-metrics';
import { useMemo } from 'react';
import { createMetricsParamsModel } from '../model/metrics-params.model';
import { MetricParams } from './metric-params';
import { cn } from '@/shared/lib/utils';
import { MetricType } from '../model/types';
import { AppointmentsMetrics } from './appointments-metrics';

type Props = {
  className?: string;
};

const chooseMetricsModel = createChooseMetricsModel();

type ReportProps = {
  className?: string;
  params: ReturnType<typeof createMetricsParamsModel>;
};

const METRIC_STRATEGY_MAPPER: Record<
  MetricType,
  React.ComponentType<ReportProps>
> = {
  [MetricType.Appointments]: AppointmentsMetrics,
  [MetricType.AllReports]: AppointmentsMetrics,
  [MetricType.RevenueShareByService]: AppointmentsMetrics,
  [MetricType.UniqueClientsOverTime]: AppointmentsMetrics,
  [MetricType.CancellationTrends]: AppointmentsMetrics,
  [MetricType.DailyLoad]: AppointmentsMetrics,
  [MetricType.TopCancellingClients]: AppointmentsMetrics,
  [MetricType.AverageCostByTime]: AppointmentsMetrics,
  [MetricType.LoadByWeekday]: AppointmentsMetrics,
  [MetricType.StatusPercentage]: AppointmentsMetrics,
  [MetricType.RevenueOverTime]: AppointmentsMetrics,
  [MetricType.AppointmentTrends]: AppointmentsMetrics,
};

export const Metrics = (props: Props) => {
  const { className } = props;
  const { $currentMetric } = useUnit(chooseMetricsModel);

  const metricsParamsModel = useMemo(() => {
    return createMetricsParamsModel($currentMetric);
  }, [$currentMetric]);

  const Metric = useMemo(() => {
    return METRIC_STRATEGY_MAPPER[$currentMetric];
  }, [$currentMetric]);

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      <ChooseMetrics model={chooseMetricsModel} />
      <MetricParams model={metricsParamsModel} />
      <Metric params={metricsParamsModel} />
    </div>
  );
};
