import { AllReports } from '../ui/all-reports';
import { AppointmentsMetrics } from '../ui/appointments-metrics';
import { createMetricsParamsModel } from './metrics-params.model';
import { MetricType } from './types';

export type MetricProps = {
  className?: string;
  params: ReturnType<typeof createMetricsParamsModel>;
};

export const METRIC_STRATEGY_MAPPER: Record<
  MetricType,
  React.ComponentType<MetricProps>
> = {
  [MetricType.Appointments]: AppointmentsMetrics,
  [MetricType.AllReports]: AllReports,
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
