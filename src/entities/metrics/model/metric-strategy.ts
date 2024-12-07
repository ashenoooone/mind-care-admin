import { AllReports } from '../ui/reports/all-reports';
import { AppointmentsMetrics } from '../ui/reports/appointments-metrics';
import { CancellationTrends } from '../ui/reports/cancelation-trends';
import { DailyLoad } from '../ui/reports/daily-load';
import { RevenueByService } from '../ui/reports/revenue-by-service';
import { RevenueOverTime } from '../ui/reports/revenue-over-time';
import { TopCancelingClients } from '../ui/reports/top-canceling-clients';
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
  [MetricType.CancellationTrends]: CancellationTrends,
  [MetricType.DailyLoad]: DailyLoad,
  [MetricType.TopCancellingClients]: TopCancelingClients,
  [MetricType.RevenueOverTime]: RevenueOverTime,
};
