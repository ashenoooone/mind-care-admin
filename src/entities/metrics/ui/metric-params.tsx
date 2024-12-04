import { useUnit } from 'effector-react';
import { createMetricsParamsModel } from '../model/metrics-params.model';
import { Switch, SwitchOption } from '@/shared/ui/switch';
import {
  INTERVAL_TYPE_DAY_WEEK_VALUES,
  INTERVAL_TYPE_WEEK_MONTH_VALUES,
  Intervals,
  IntervalTypeDayWeek,
  IntervalTypeWeekMonth,
} from '../model/types';
import { mapIntervalTypeToRussian } from '../model/lib';

type Props = {
  className?: string;
  model: ReturnType<typeof createMetricsParamsModel>;
};

const getSwitchOptions = (
  interval: Intervals
): SwitchOption[] => {
  if (!interval) return [];
  if (interval.type === 'day-week') {
    return INTERVAL_TYPE_DAY_WEEK_VALUES.map((val) => ({
      value: val,
      label: mapIntervalTypeToRussian(val),
    }));
  }
  return INTERVAL_TYPE_WEEK_MONTH_VALUES.map((val) => ({
    label: mapIntervalTypeToRussian(val),
    value: val,
  }));
};

export const MetricParams = (props: Props) => {
  const { className, model } = props;
  const {
    $metricsParams,
    updateMetricsParams,
    $interval,
    updateIntervalEv,
  } = useUnit(model);

  return (
    <div className={className}>
      {$interval && (
        <Switch
          options={getSwitchOptions($interval)}
          selectedValue={$interval.value}
          onChange={(value: string) => {
            if ($interval.type === 'day-week') {
              updateIntervalEv({
                ...$interval,
                value: value as IntervalTypeDayWeek,
              });
            } else {
              updateIntervalEv({
                ...$interval,
                value: value as IntervalTypeWeekMonth,
              });
            }
          }}
        />
      )}
    </div>
  );
};
