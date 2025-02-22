import {
  AppointmentStatus,
  appointmentStatusMapper,
  TAppointment,
} from '@/entities/appointments';
import { cn } from '@/shared/lib/utils';
import { List, ListItem } from '@/shared/ui/list';
import { Skeleton } from '@/shared/ui/skeleton';
import { Error } from '@/shared/ui/error';
type Props = {
  appointment?: TAppointment;
  isLoading?: boolean;
  isError?: boolean;
};

const formatTime = (date: string) => {
  const localDate = new Date(date);
  return localDate.toLocaleTimeString('ru-RU', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const AppointmentInfo = (props: Props) => {
  const { appointment, isLoading, isError } = props;

  if (isLoading || !appointment) {
    return <Skeleton className="h-24 w-full" />;
  }

  if (isError) {
    return (
      <Error
        title="Ошибка при загрузке информации о записи"
        description="Попробуйте обновить страницу"
      />
    );
  }

  return (
    <List title="Информация о записи">
      <ListItem>{appointment.service.name}</ListItem>
      <ListItem>
        {formatTime(appointment.startTime)} -
        {formatTime(appointment.endTime)}
      </ListItem>
      <ListItem
        className={cn('font-bold', {
          'text-red-500':
            appointment.status ===
            AppointmentStatus.CANCELLED,
          'text-green-500':
            appointment.status ===
            AppointmentStatus.COMPLETED,
          'text-blue-500':
            appointment.status ===
            AppointmentStatus.SCHEDULED,
        })}
      >
        {appointmentStatusMapper[appointment.status]}
      </ListItem>
    </List>
  );
};
