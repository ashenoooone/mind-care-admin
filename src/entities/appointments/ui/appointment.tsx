import { cn } from '@/shared/lib/utils';
import {
  AppointmentStatus,
  TAppointment,
} from '../model/types';

import { ReactNode } from 'react';
import { Card } from '@/shared/ui/card';
import { Separator } from '@/shared/ui/separator';
import { Money } from '@/shared/ui/money';

type Props = {
  className?: string;
  appointment: TAppointment;
  status?: ReactNode;
  actions?: ReactNode;
};

const formatDate = (date: string) => {
  return new Date(date)
    .toISOString()
    .split('T')[1]
    .split('.')[0];
};

export const Appointment = (props: Props) => {
  const { className, appointment, status, actions } = props;

  return (
    <Card
      className={cn(
        className,
        'w-full mx-auto bg-white rounded-lg p-3 flex flex-col text-sm shadow-sm shadow-blue-400 border-blue-700',
        {
          'shadow-green-400 border-green-700':
            appointment.status ===
            AppointmentStatus.COMPLETED,
          'shadow-red-400 border-red-700':
            appointment.status ===
            AppointmentStatus.CANCELLED,
        }
      )}
    >
      {status}
      <p className="text-sm font-bold pr-7">
        {appointment.service.name}
      </p>
      <Separator className="my-2" />
      <div className="flex gap-2 font-bold flex-wrap">
        <p className="text-sm">{appointment.client.name}</p>
        <Money>{appointment.service.price}</Money>
        <p className="text-sm">
          {appointment.service.duration} мин.
        </p>
      </div>
      <div className="mt-auto">
        <div>
          {formatDate(appointment.startTime)} -{' '}
          {formatDate(appointment.endTime)}
        </div>
        <span></span>
        {new Date(
          appointment.startTime
        ).toLocaleDateString()}
      </div>
      {actions}
    </Card>
  );
};
