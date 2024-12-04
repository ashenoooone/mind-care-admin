import { AppointmentStatus } from '@/entities/appointments/@x/statistic';

export type GetMetricDto = {
  dateFrom?: string;
  dateTo?: string;
  serviceId?: number;
  clientId?: number;
};

export enum ReportType {
  Appointments = 'appointments', // Общий отчет по записям
  AllReports = 'reports', // Сводный отчет
  RevenueShareByService = 'revenue-by-service', // Соотношение выручки по услугам
  UniqueClientsOverTime = 'unique-clients-over-time', // Уникальные клиенты по времени
  CancellationTrends = 'cancellation-trends', // Динамика отмен
  DailyLoad = 'daily-load', // Средняя загрузка рабочего дня
  TopCancellingClients = 'top-cancelling-clients', // Отмены по клиентам
  AverageCostByTime = 'average-cost-over-time', // Средняя стоимость записи
  LoadByWeekday = 'load-by-weekday', // Загруженность по дням недели
  StatusPercentage = 'status-percentage', // Процент записей по статусам
  RevenueOverTime = 'revenue-over-time', // Выручка по дням или неделям
  AppointmentTrends = 'appointment-trends', // Динамика количества записей
}

export interface AppointmentsMetrics {
  totalProfit: number;
  totalLoss: number;
  plannedProfit: number;
  counts: {
    [key in AppointmentStatus]: number;
  };
  totalHours: number;
  totalMinutes: number;
}

export interface AllReports {
  averageDuration: number;
  mostPopularService: {
    serviceId: number;
    count: number;
  } | null;
  busiestTime: {
    time: string;
    count: number;
  }[];
  uniqueClients: number;
  averageAppointmentCost: number;
  appointmentsByWeekday: Record<string, number>;
  topCancelingClients: {
    clientId: number;
    cancelledCount: number;
  }[];
  totalSupportedClients: number;
  averageDailyLoad: number;
}

export type GetAverageCostByTime = {
  period: string;
  averageCost: number;
}[];

export type GetLoadByWeekDay = Record<
  string,
  Record<number, number>
>;

export interface RevenueShareByService {
  serviceId: number;
  serviceName: string;
  revenue: number;
  percentage: number;
}

export interface UniqueClientsOverTime {
  period: string;
  count: number;
}

export interface CancellationTrends {
  period: string;
  count: number;
}

export interface DailyLoad {
  date: string;
  averageLoadMinutes: number;
}

export interface AppointmentTrends {
  period: string;
  count: number;
}

export interface StatusPercentage {
  status: AppointmentStatus;
  percentage: number;
}

export interface RevenueOverTime {
  period: string;
  revenue: number;
}
