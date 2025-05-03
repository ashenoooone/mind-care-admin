import {
  AppointmentStatus,
  TAppointment,
} from '@/entities/appointments';
import { cn } from '@/shared/lib/utils';
import { ComponentProps } from 'react';

type Props = {
  className?: string;
  event: TAppointment;
  hour: number;
  isActive?: boolean;
} & ComponentProps<'div'>;

export const Event = (props: Props) => {
  const { className, event, hour, isActive, ...rest } =
    props;

  return (
    <div
      className={cn(
        'cursor-pointer z-40 pl-2 rounded-md transition-all hover:shadow-lg relative',
        className,
        {
          'bg-red-500/50 after:content-[""] after:absolute after:left-0 after:top-0 after:w-1 after:h-full after:bg-red-500/50 hover:bg-red-500/60 hover:after:bg-red-500/60':
            hour % 6 === 0,
          'bg-blue-500/50 after:content-[""] after:absolute after:left-0 after:top-0 after:w-1 after:h-full after:bg-blue-500/50 hover:bg-blue-500/60 hover:after:bg-blue-500/60':
            hour % 6 === 1,
          'bg-green-500/50 after:content-[""] after:absolute after:left-0 after:top-0 after:w-1 after:h-full after:bg-green-500/50 hover:bg-green-500/60 hover:after:bg-green-500/60':
            hour % 6 === 2,
          'bg-purple-500/50 after:content-[""] after:absolute after:left-0 after:top-0 after:w-1 after:h-full after:bg-purple-500/50 hover:bg-purple-500/60 hover:after:bg-purple-500/60':
            hour % 6 === 3,
          'bg-yellow-500/50 after:content-[""] after:absolute after:left-0 after:top-0 after:w-1 after:h-full after:bg-yellow-500/50 hover:bg-yellow-500/60 hover:after:bg-yellow-500/60':
            hour % 6 === 4,
          'bg-orange-500/50 after:content-[""] after:absolute after:left-0 after:top-0 after:w-1 after:h-full after:bg-orange-500/50 hover:bg-orange-500/60 hover:after:bg-orange-500/60':
            hour % 6 === 5,
          'animate-pulse border-4 border-dashed border-white/40 shadow-inner transform rotate-1':
            isActive,
        },
        {}
      )}
      {...rest}
    >
      <div className="relative">
        <h6 className="text-sm font-bold">
          {event.service.name}
        </h6>
        <div
          className={cn(
            'w-2 h-3 absolute top-0 rounded-b-full right-0',
            {
              'bg-green-700':
                event.status ===
                AppointmentStatus.COMPLETED,
              'bg-blue-700':
                event.status ===
                AppointmentStatus.SCHEDULED,
              'bg-red-700':
                event.status ===
                AppointmentStatus.CANCELLED,
            }
          )}
        />
      </div>
    </div>
  );
};
