import {
  AppointmentStatus,
  TAppointment,
} from '@/entities/appointments/@x/statistic';

export const calculateAppointmentMetrics = (
  appointments: TAppointment[]
) => {
  const metrics = appointments.reduce(
    (acc, appointment) => {
      const { status, service, startTime, endTime } =
        appointment;

      // Расчет прибыли, потерь, и планируемой прибыли
      if (status === AppointmentStatus.COMPLETED) {
        acc.totalProfit += service.price;
      } else if (status === AppointmentStatus.CANCELLED) {
        acc.totalLoss += service.price;
      } else if (status === AppointmentStatus.SCHEDULED) {
        acc.plannedProfit += service.price;
      }

      // Подсчет количества записей по статусам
      acc.counts[status]++;

      // Расчет суммарного времени
      const duration =
        (new Date(endTime).getTime() -
          new Date(startTime).getTime()) /
        1000; // В секундах
      acc.totalMinutes += Math.floor(duration / 60);

      return acc;
    },
    {
      totalProfit: 0, // Суммарная прибыль
      totalLoss: 0, // Суммарная потеря
      plannedProfit: 0, // Планируемая прибыль
      counts: {
        [AppointmentStatus.COMPLETED]: 0, // Завершенные
        [AppointmentStatus.CANCELLED]: 0, // Отмененные
        [AppointmentStatus.SCHEDULED]: 0, // Запланированные
      },
      totalMinutes: 0, // Общее время в минутах
    }
  );

  // Преобразование суммарного времени в часы и минуты
  const totalHours = Math.floor(metrics.totalMinutes / 60);
  const remainingMinutes = metrics.totalMinutes % 60;

  return {
    totalProfit: metrics.totalProfit,
    totalLoss: metrics.totalLoss,
    plannedProfit: metrics.plannedProfit,
    counts: metrics.counts,
    totalHours,
    totalMinutes: remainingMinutes,
  };
};
