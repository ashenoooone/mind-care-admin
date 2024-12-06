'use client';

import { useUnit } from 'effector-react';
import { createChooseMetricsModel } from '../model/choose-metrics.model';
import {
  SelectComponent,
  SelectOption,
} from '@/shared/ui/select';
import { MetricType } from '../model/types';
import { mapMetricTypeToRussian } from '../model/lib';

type Props = {
  className?: string;
  model: ReturnType<typeof createChooseMetricsModel>;
};

export const ChooseMetrics = (props: Props) => {
  const { className, model } = props;

  const { $currentMetric, setMetricEv } = useUnit(model);

  const options: SelectOption[] = Object.values(
    MetricType
  ).map((val) => ({
    label: mapMetricTypeToRussian(val),
    value: val,
  }));

  const onValueChange = (val: string) => {
    setMetricEv(val as MetricType);
  };

  return (
    <SelectComponent
      label="Вид отчета"
      className={className}
      options={options}
      onValueChange={onValueChange}
      value={$currentMetric}
    />
  );
};
