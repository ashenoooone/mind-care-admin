import { useQuery } from '@tanstack/react-query';
import { MetricsService } from './metrics.service';
import { GetMetricDto } from './types';

// ====== ОБЩИЙ ОТЧЕТ ПО ЗАПИСЯМ =======
const APPOINTMENTS_REPORT_QUERY_KEY = 'appointments_report';
export const useAppointmentsReport = (
  params: GetMetricDto
) => {
  return useQuery({
    queryKey: [
      APPOINTMENTS_REPORT_QUERY_KEY,
      [...Object.values(params)],
    ],
    queryFn: () => MetricsService.getAppointments(params),
  });
};

// ====== СВОДНЫЙ ОТЧЕТ =======
const ALL_REPORTS_QUERY_KEY = 'all_reports';
export const useAllReports = (params: GetMetricDto) => {
  return useQuery({
    queryKey: [
      ALL_REPORTS_QUERY_KEY,
      [...Object.values(params)],
    ],
    queryFn: () => MetricsService.getAllReports(params),
  });
};

// ====== СОПОСТАВЛЕНИЕ ВЫРУЧКИ ПО УСЛУГАМ =======
const REVENUE_SHARE_BY_SERVICE_QUERY_KEY =
  'revenue_share_by_service';
export const useRevenueShareByService = (
  params: GetMetricDto
) => {
  return useQuery({
    queryKey: [
      REVENUE_SHARE_BY_SERVICE_QUERY_KEY,
      [...Object.values(params)],
    ],
    queryFn: () =>
      MetricsService.getRevenueShareByService(params),
  });
};

// ====== УНИКАЛЬНЫЕ КЛИЕНТЫ ПО ВРЕМЕНИ =======
const UNIQUE_CLIENTS_OVER_TIME_QUERY_KEY =
  'unique_clients_over_time';
export const useUniqueClientsOverTime = (
  params: GetMetricDto,
  interval: 'week' | 'month'
) => {
  return useQuery({
    queryKey: [
      UNIQUE_CLIENTS_OVER_TIME_QUERY_KEY,
      [...Object.values(params), interval],
    ],
    queryFn: () =>
      MetricsService.getUniqueClientsOverTime(
        params,
        interval
      ),
  });
};

// ====== ДИНАМИКА ОТМЕН =======
const CANCELLATION_TRENDS_QUERY_KEY = 'cancellation_trends';
export const useCancellationTrends = (
  params: GetMetricDto,
  interval: 'day' | 'week'
) => {
  return useQuery({
    queryKey: [
      CANCELLATION_TRENDS_QUERY_KEY,
      [...Object.values(params), interval],
    ],
    queryFn: () =>
      MetricsService.getCancellationTrends(
        params,
        interval
      ),
  });
};

// ====== СРЕДНЯЯ ЗАГРУЗКА РАБОЧЕГО ДНЯ =======
const DAILY_LOAD_QUERY_KEY = 'daily_load';
export const useDailyLoad = (params: GetMetricDto) => {
  return useQuery({
    queryKey: [
      DAILY_LOAD_QUERY_KEY,
      [...Object.values(params)],
    ],
    queryFn: () => MetricsService.getDailyLoad(params),
  });
};

// ====== ОТМЕНЫ ПО КЛИЕНТАМ =======
const TOP_CANCELLING_CLIENTS_QUERY_KEY =
  'top_cancelling_clients';
export const useTopCancellingClients = (
  params: GetMetricDto
) => {
  return useQuery({
    queryKey: [
      TOP_CANCELLING_CLIENTS_QUERY_KEY,
      [...Object.values(params)],
    ],
    queryFn: () =>
      MetricsService.getTopCancellingClients(params),
  });
};

// ====== СРЕДНЯЯ СТОИМОСТЬ ЗАПИСИ =======
const AVERAGE_COST_BY_TIME_QUERY_KEY =
  'average_cost_by_time';
export const useAverageCostByTime = (
  params: GetMetricDto,
  interval: 'day' | 'week'
) => {
  return useQuery({
    queryKey: [
      AVERAGE_COST_BY_TIME_QUERY_KEY,
      [...Object.values(params), interval],
    ],
    queryFn: () =>
      MetricsService.getAverageCostByTime(params, interval),
  });
};

// ====== ЗАГРУЖЕННОСТЬ ПО ДНЯМ НЕДЕЛИ =======
const LOAD_BY_WEEKDAY_QUERY_KEY = 'load_by_weekday';
export const useLoadByWeekday = (
  params: FuncFirstParameter<
    typeof MetricsService.getLoadByWeekday
  >
) => {
  return useQuery({
    queryKey: [
      LOAD_BY_WEEKDAY_QUERY_KEY,
      [...Object.values(params)],
    ],
    queryFn: () => MetricsService.getLoadByWeekday(params),
  });
};

// ====== ПРОЦЕНТ ЗАПИСЕЙ ПО СТАТУСАМ =======
const STATUS_PERCENTAGE_QUERY_KEY = 'status_percentage';
export const useStatusPercentage = (
  params: GetMetricDto
) => {
  return useQuery({
    queryKey: [
      STATUS_PERCENTAGE_QUERY_KEY,
      [...Object.values(params)],
    ],
    queryFn: () =>
      MetricsService.getStatusPercentage(params),
  });
};

// ====== ВЫРУЧКА ПО ДНЯМ ИЛИ НЕДЕЛЯМ =======
const REVENUE_OVER_TIME_QUERY_KEY = 'revenue_over_time';
export const useRevenueOverTime = (
  params: GetMetricDto,
  interval: 'day' | 'week'
) => {
  return useQuery({
    queryKey: [
      REVENUE_OVER_TIME_QUERY_KEY,
      [...Object.values(params), interval],
    ],
    queryFn: () =>
      MetricsService.getRevenueOverTime(params, interval),
  });
};

// ====== ДИНАМИКА КОЛИЧЕСТВА ЗАПИСЕЙ =======
const APPOINTMENT_TRENDS_QUERY_KEY = 'appointment_trends';
export const useAppointmentTrends = (
  params: GetMetricDto,
  interval: 'day' | 'week'
) => {
  return useQuery({
    queryKey: [
      APPOINTMENT_TRENDS_QUERY_KEY,
      [...Object.values(params), interval],
    ],
    queryFn: () =>
      MetricsService.getAppointmentTrends(params, interval),
  });
};
