import { $api } from '@/shared/api';
import {
  GetAverageCostByTime,
  GetLoadByWeekDay,
  GetMetricDto,
} from './types';
import {
  AppointmentsMetrics,
  AllReports,
  RevenueShareByService,
  UniqueClientsOverTime,
  CancellationTrends,
  DailyLoad,
  StatusPercentage,
  RevenueOverTime,
  AppointmentTrends,
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
    interval: 'week' | 'month'
  ) {
    return $api.get<UniqueClientsOverTime[]>(
      'metrics/unique-clients-over-time',
      {
        params: {
          ...params,
          interval,
        },
      }
    );
  }

  // Динамика отмен
  static async getCancellationTrends(
    params: GetMetricDto,
    interval: 'day' | 'week'
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

  // Средняя стоимость записи
  static async getAverageCostByTime(
    params: GetMetricDto,
    interval: 'day' | 'week'
  ) {
    return $api.get<GetAverageCostByTime>(
      'metrics/average-cost-over-time',
      {
        params: {
          ...params,
          interval,
        },
      }
    );
  }

  // Загруженность по дням недели
  static async getLoadByWeekday(params: GetMetricDto) {
    return $api.get<GetLoadByWeekDay>(
      'metrics/load-by-weekday',
      {
        params,
      }
    );
  }

  // Процент записей по статусам
  static async getStatusPercentage(params: GetMetricDto) {
    return $api.get<StatusPercentage[]>(
      'metrics/status-percentage',
      {
        params,
      }
    );
  }

  // Выручка по дням или неделям
  static async getRevenueOverTime(
    params: GetMetricDto,
    interval: 'day' | 'week'
  ) {
    return $api.get<RevenueOverTime[]>(
      'metrics/revenue-over-time',
      {
        params: {
          ...params,
          interval,
        },
      }
    );
  }

  // Динамика количества записей
  static async getAppointmentTrends(
    params: GetMetricDto,
    interval: 'day' | 'week'
  ) {
    return $api.get<AppointmentTrends[]>(
      'metrics/appointment-trends',
      {
        params: {
          ...params,
          interval,
        },
      }
    );
  }
}
