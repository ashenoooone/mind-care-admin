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
  denyButton?: React.ReactNode;
  confirmButton?: React.ReactNode;
  editTimeButton?: React.ReactNode;
  editServiceButton?: React.ReactNode;
};

const formatTime = (date: string) => {
  const localDate = new Date(date);
  return localDate.toUTCString().slice(16, 22);
};

export const AppointmentInfo = (props: Props) => {
  const {
    appointment,
    isLoading,
    isError,
    denyButton,
    confirmButton,
    editTimeButton,
    editServiceButton,
  } = props;

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

  const needToShowButtons =
    appointment.status === AppointmentStatus.SCHEDULED;

  return (
    <List title="Информация о записи">
      <ListItem>
        {appointment.service.name}
        {editServiceButton}
      </ListItem>
      <ListItem>
        {formatTime(appointment.startTime)} -
        {formatTime(appointment.endTime)}
        {editTimeButton}
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
      {needToShowButtons && (
        <>
          {confirmButton && (
            <ListItem className="mb-2">
              {confirmButton}
            </ListItem>
          )}
          {denyButton && (
            <ListItem className="mb-2">
              {denyButton}
            </ListItem>
          )}
        </>
      )}
    </List>
  );
};
