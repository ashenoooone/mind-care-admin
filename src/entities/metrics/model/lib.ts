import {
  TIntervalTypeDayWeek,
  TIntervalTypeWeekMonth,
  MetricType,
} from './types';

const metricTypeToRussianMap: Record<MetricType, string> = {
  [MetricType.Appointments]: 'Общий отчет по записям',
  [MetricType.AllReports]: 'Сводный отчет',
  [MetricType.RevenueShareByService]:
    'Соотношение выручки по услугам',
  [MetricType.UniqueClientsOverTime]:
    'Уникальные клиенты по времени',
  [MetricType.CancellationTrends]: 'Динамика отмен',
  [MetricType.DailyLoad]: 'Средняя загрузка рабочего дня',
  [MetricType.TopCancellingClients]: 'Отмены по клиентам',
  [MetricType.AverageCostByTime]:
    'Средняя стоимость записи',
  [MetricType.LoadByWeekday]:
    'Загруженность по дням недели',
  [MetricType.StatusPercentage]:
    'Процент записей по статусам',
  [MetricType.RevenueOverTime]:
    'Выручка по дням или неделям',
  [MetricType.AppointmentTrends]:
    'Динамика количества записей',
};

export function mapMetricTypeToRussian(
  metricType: MetricType
): string {
  return (
    metricTypeToRussianMap[metricType] ||
    'Неизвестный тип метрики'
  );
}

export const intervalTypeToRussianMap: Record<
  TIntervalTypeDayWeek | TIntervalTypeWeekMonth,
  string
> = {
  day: 'День',
  week: 'Неделя',
  month: 'Месяц',
};

// Функция для получения значения на русском
export function mapIntervalTypeToRussian(
  interval: TIntervalTypeDayWeek | TIntervalTypeWeekMonth
): string {
  return (
    intervalTypeToRussianMap[interval] ||
    'Неизвестный интервал'
  );
}
