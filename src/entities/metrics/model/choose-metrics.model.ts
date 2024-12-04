import { createEvent, createStore } from 'effector';
import { MetricType } from './types';

export const createChooseMetricsModel = () => {
  const $currentMetric = createStore<MetricType>(
    MetricType.AllReports
  );

  const setMetricEv = createEvent<MetricType>();

  $currentMetric.on(setMetricEv, (_, m) => m);

  return {
    $currentMetric,
    setMetricEv,
  };
};
