import { cn } from '@/shared/lib/utils';
import { TAppointment } from '../model/types';

import { ReactNode } from 'react';
import { Card } from '@/shared/ui/card';
import { Separator } from '@/shared/ui/separator';

type Props = {
  className?: string;
  appointment: TAppointment;
  status?: ReactNode;
};

const formatDate = (date: Date) => {
  return new Date(date).toLocaleTimeString();
};

export const Appointment = (props: Props) => {
  const { className, appointment, status } = props;

  return (
    <Card
      className={cn(
        className,
        'w-full mx-auto bg-white shadow-md rounded-lg p-3 flex flex-col text-sm'
      )}
    >
      {status}
      <p className="text-sm font-bold pr-7">
        {appointment.service.name}
      </p>
      <Separator className="my-2" />
      <div className="flex gap-2 font-bold">
        <p className="text-sm">{appointment.client.name}</p>
        <p className="text-sm font-bold text-green-600">
          {appointment.service.price} ₽
        </p>
        <p className="text-sm">
          {appointment.service.duration} мин.
        </p>
      </div>
      <div className="mt-auto">
        {formatDate(appointment.startTime)} -{' '}
        {formatDate(appointment.endTime)}
      </div>
    </Card>
  );
};
