import { $api } from '@/shared/api';
import {
  GetMetricDto,
  TIntervalTypeDayWeek,
  TIntervalTypeWeekMonth,
} from './types';
import {
  AppointmentsMetrics,
  AllReports,
  RevenueShareByService,
  UniqueClientsOverTime,
  CancellationTrends,
  DailyLoad,
  RevenueOverTime,
} from './types';

export class MetricsService {
  // Получение общего отчета по записям
  static async getAppointments(params: GetMetricDto) {
    return $api.get<AppointmentsMetrics>(
      'metrics/appointments',
      {
        params,
      }
    );
  }

  // Получение сводного отчета
  static async getAllReports(params: GetMetricDto) {
    return $api.get<AllReports>('metrics/reports', {
      params,
    });
  }

  // Соотношение выручки по услугам
  static async getRevenueShareByService(
    params: GetMetricDto
  ) {
    return $api.get<RevenueShareByService[]>(
      'metrics/revenue-by-service',
      {
        params,
      }
    );
  }

  // Уникальные клиенты по времени
  static async getUniqueClientsOverTime(
    params: GetMetricDto,
    interval: TIntervalTypeWeekMonth
  ) {
    return $api.get<UniqueClientsOverTime[]>(
      'metrics/unique-clients-over-time',
      {
        params: {
          ...params,
          interval: interval.value,
        },
      }
    );
  }

  // Динамика отмен
  static async getCancellationTrends(
    params: GetMetricDto,
    interval: TIntervalTypeDayWeek
  ) {
    return $api.get<CancellationTrends[]>(
      'metrics/cancellation-trends',
      {
        params: {
          ...params,
          interval,
        },
      }
    );
  }

  // Средняя загрузка рабочего дня
  static async getDailyLoad(params: GetMetricDto) {
    return $api.get<DailyLoad[]>('metrics/daily-load', {
      params,
    });
  }

  // Отмены по клиентам
  static async getTopCancellingClients(
    params: GetMetricDto
  ) {
    return $api.get<
      {
        clientId: number;
        cancelledCount: number;
      }[]
    >('metrics/top-cancelling-clients', {
      params,
    });
  }

  // Выручка по дням или неделям
  static async getRevenueOverTime(
    params: GetMetricDto,
    interval: TIntervalTypeDayWeek
  ) {
    return $api.get<RevenueOverTime[]>(
      'metrics/revenue-over-time',
      {
        params: {
          ...params,
          interval: interval.value,
        },
      }
    );
  }
}
