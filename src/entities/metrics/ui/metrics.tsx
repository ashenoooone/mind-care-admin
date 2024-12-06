'use client';
import { useUnit } from 'effector-react';
import { createChooseMetricsModel } from '../model/choose-metrics.model';
import { ChooseMetrics } from './choose-metrics';
import { useMemo } from 'react';
import { createMetricsParamsModel } from '../model/metrics-params.model';
import { MetricParams } from './metric-params';
import { cn } from '@/shared/lib/utils';
import { METRIC_STRATEGY_MAPPER } from '../model/metric-strategy';

type Props = {
  className?: string;
};

const chooseMetricsModel = createChooseMetricsModel();

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
    <div className={cn('flex flex-col gap-5', className)}>
      <ChooseMetrics model={chooseMetricsModel} />
      <MetricParams model={metricsParamsModel} />
      <Metric params={metricsParamsModel} />
    </div>
  );
};
