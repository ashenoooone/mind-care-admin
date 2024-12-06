import { AllReports } from '../ui/reports/all-reports';
import { AppointmentsMetrics } from '../ui/reports/appointments-metrics';
import { RevenueByService } from '../ui/reports/revenue-by-service';
import { UniqueClientsOverTime } from '../ui/reports/unique-clients-over-time';
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
  [MetricType.RevenueShareByService]: RevenueByService,
  [MetricType.UniqueClientsOverTime]: UniqueClientsOverTime,
  [MetricType.CancellationTrends]: AppointmentsMetrics,
  [MetricType.DailyLoad]: AppointmentsMetrics,
  [MetricType.TopCancellingClients]: AppointmentsMetrics,
  [MetricType.AverageCostByTime]: AppointmentsMetrics,
  [MetricType.LoadByWeekday]: AppointmentsMetrics,
  [MetricType.StatusPercentage]: AppointmentsMetrics,
  [MetricType.RevenueOverTime]: AppointmentsMetrics,
  [MetricType.AppointmentTrends]: AppointmentsMetrics,
};
