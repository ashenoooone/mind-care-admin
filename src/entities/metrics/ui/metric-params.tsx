import { useUnit } from 'effector-react';
import { createMetricsParamsModel } from '../model/metrics-params.model';
import { Switch, SwitchOption } from '@/shared/ui/switch';
import {
  INTERVAL_TYPE_DAY_WEEK_VALUES,
  INTERVAL_TYPE_WEEK_MONTH_VALUES,
  Intervals,
  TIntervalTypeDayWeek,
  TIntervalTypeWeekMonth,
} from '../model/types';
import { mapIntervalTypeToRussian } from '../model/lib';
import { Input } from '@/shared/ui/input';
import {
  createSearchClientsModel,
  SearchClients,
} from '@/entities/users/@x/search-clients';
import {
  createSearchServiceModel,
  SearchServices,
} from '@/entities/service/@x/search-service';
import { cn } from '@/shared/lib/utils';

type Props = {
  className?: string;
  model: ReturnType<typeof createMetricsParamsModel>;
};

const searchClientsModel = createSearchClientsModel({
  debounceTiming: 500,
});

const searchServicesModel = createSearchServiceModel({
  debounceTiming: 500,
});

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
    <div className={cn(className, 'flex flex-col gap-5')}>
      {$interval && (
        <Switch
          options={getSwitchOptions($interval)}
          selectedValue={$interval.value}
          onChange={(value: string) => {
            if ($interval.type === 'day-week') {
              updateIntervalEv({
                ...$interval,
                value:
                  value as TIntervalTypeDayWeek['value'],
              });
            } else {
              updateIntervalEv({
                ...$interval,
                value:
                  value as TIntervalTypeWeekMonth['value'],
              });
            }
          }}
        />
      )}
      <div className="flex gap-2">
        <Input
          label="Дата с"
          type="date"
          value={$metricsParams.dateFrom}
          onChange={(e) =>
            updateMetricsParams({
              dateFrom: e.target.value
                ? e.target.value
                : undefined,
            })
          }
        />
        <Input
          label="Дата по"
          type="date"
          value={$metricsParams.dateTo}
          onChange={(e) =>
            updateMetricsParams({
              dateTo: e.target.value
                ? e.target.value
                : undefined,
            })
          }
        />
      </div>
      <div className="mt-4 flex gap-2">
        <SearchClients
          onClientClick={(client) =>
            updateMetricsParams({
              clientId: client?.id,
            })
          }
          model={searchClientsModel}
        />
        <SearchServices
          onServiceClick={(service) =>
            updateMetricsParams({
              serviceId: service?.id ?? undefined,
            })
          }
          model={searchServicesModel}
        />
      </div>
    </div>
  );
};
