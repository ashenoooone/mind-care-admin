import { createStore, createEvent } from 'effector';
import {
  GetMetricDto,
  MetricType,
  Intervals,
} from './types';

export const createMetricsParamsModel = (
  currentMetric: MetricType
) => {
  const $metricsParams = createStore<GetMetricDto>({});
  const updateMetricsParams =
    createEvent<Partial<GetMetricDto>>();

  $metricsParams.on(
    updateMetricsParams,
    (state, payload) => ({
      ...state,
      ...payload,
    })
  );

  const $interval = createStore<Intervals | null>(null);
  const updateIntervalEv = createEvent<Intervals | null>();
  $interval.on(updateIntervalEv, (_, i) => i);

  switch (currentMetric) {
    case MetricType.UniqueClientsOverTime:
      updateIntervalEv({
        type: 'week-month',
        value: 'week',
      });
      break;

    case MetricType.CancellationTrends:
    case MetricType.AverageCostByTime:
    case MetricType.RevenueOverTime:
    case MetricType.AppointmentTrends:
      updateIntervalEv({
        type: 'day-week',
        value: 'day',
      });
      break;

    default:
      updateIntervalEv(null);
  }

  return {
    $metricsParams,
    updateMetricsParams,
    $interval,
    updateIntervalEv,
  } as const;
};
