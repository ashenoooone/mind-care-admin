import { useUnit } from 'effector-react';
import { useAllReports } from '../../model/hooks';
import { MetricProps } from '../../model/metric-strategy';
import Loader from '@/shared/ui/loader';

export const AllReports = (props: MetricProps) => {
  const { className, params } = props;
  const { $metricsParams } = useUnit(params);
  const { data, isLoading } = useAllReports($metricsParams);

  if (isLoading || !data) return <Loader />;

  const {
    averageDuration,
    mostPopularService,
    busiestTime,
    uniqueClients,
    averageAppointmentCost,
    appointmentsByWeekday,
    topCancelingClients,
    averageDailyLoad,
  } = data.data;

  return (
    <div
      className={`p-4 bg-white shadow rounded ${className}`}
    >
      <h2 className="text-lg font-bold mb-4">
        Общий отчет
      </h2>
      <ul className="space-y-2 text-sm">
        <li>
          <strong>Средняя продолжительность визита:</strong>{' '}
          {averageDuration} минут
        </li>
        <li>
          <strong>Самая популярная услуга:</strong>{' '}
          {mostPopularService
            ? `${mostPopularService.service.name} (${mostPopularService.count} заказов)`
            : 'Нет данных'}
        </li>
        <li>
          <strong>Самое загруженное время:</strong>
          <ul className="pl-4 list-disc">
            {busiestTime.map((time) => (
              <li key={time.time}>
                {time.time} — {time.count} записей
              </li>
            ))}
          </ul>
        </li>
        <li>
          <strong>Уникальных клиентов:</strong>{' '}
          {uniqueClients}
        </li>
        <li>
          <strong>Средняя стоимость записи:</strong>{' '}
          {averageAppointmentCost} ₽
        </li>
        <li>
          <strong>Записи по дням недели:</strong>
          <ul className="pl-4 list-disc">
            {Object.entries(appointmentsByWeekday).map(
              ([weekday, count]) => (
                <li key={weekday}>
                  {weekday}: {count}
                </li>
              )
            )}
          </ul>
        </li>
        <li>
          <strong>Топ клиентов по отменам:</strong>
          <ul className="pl-4 list-disc">
            {topCancelingClients.length > 0 ? (
              topCancelingClients.map((client) => (
                <li key={client.name}>
                  Клиент ID {client.name} (
                  {client.phoneNumber}):{' '}
                  {client.cancelledCount} отмен
                </li>
              ))
            ) : (
              <li>Нет данных</li>
            )}
          </ul>
        </li>
        <li>
          <strong>Средняя дневная нагрузка:</strong>{' '}
          {`${Math.floor(averageDailyLoad / 60)} ч ${Math.round(averageDailyLoad % 60)} мин`}
        </li>
      </ul>
    </div>
  );
};
