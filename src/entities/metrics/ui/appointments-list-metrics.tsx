import { Money } from '@/shared/ui/money';
import { AppointmentsMetrics } from '../model/types';

type Props = {
  className?: string;
  metrics: AppointmentsMetrics;
};

export const AppointmentsListMetrics = (props: Props) => {
  const { className, metrics } = props;

  return (
    <div className={className}>
      <div className="grid gap-2 grid-cols-2 max-w-max">
        <p>Общая прибыль:</p>
        <p>
          <Money>{metrics.totalProfit}</Money>
        </p>
        <p>Ожидаемая прибыль:</p>
        <p>
          <Money variant="blue">
            {metrics.plannedProfit}
          </Money>
        </p>
        <p>Потерянная прибыль:</p>
        <p>
          <Money variant="red">{metrics.totalLoss}</Money>
        </p>
        <p>Завершенные записи:</p>
        <p>{metrics.counts.COMPLETED}</p>
        <p>Отмененные записи:</p>
        <p>{metrics.counts.CANCELLED}</p>
        <p>Запланированные записи:</p>
        <p>{metrics.counts.SCHEDULED}</p>

        <p>Общее время:</p>
        <p>
          {metrics.totalHours} ч {metrics.totalMinutes} мин
        </p>
      </div>
    </div>
  );
};
