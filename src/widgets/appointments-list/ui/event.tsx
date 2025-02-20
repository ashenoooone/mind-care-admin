import { TAppointment } from '@/entities/appointments';
import { cn } from '@/shared/lib/utils';
import { ComponentProps } from 'react';

type Props = {
  className?: string;
  event: TAppointment;
  hour: number;
} & ComponentProps<'div'>;

export const Event = (props: Props) => {
  const { className, event, hour, ...rest } = props;
  return (
    <div
      className={cn(
        'cursor-pointer p-1 pl-4 rounded-md',
        className,
        {
          'bg-red-500/50 after:content-[""] after:absolute after:left-0 after:top-0 after:w-1 after:h-full after:bg-red-500/50':
            hour % 6 === 0,
          'bg-blue-500/50 after:content-[""] after:absolute after:left-0 after:top-0 after:w-1 after:h-full after:bg-blue-500/50':
            hour % 6 === 1,
          'bg-green-500/50 after:content-[""] after:absolute after:left-0 after:top-0 after:w-1 after:h-full after:bg-green-500/50':
            hour % 6 === 2,
          'bg-purple-500/50 after:content-[""] after:absolute after:left-0 after:top-0 after:w-1 after:h-full after:bg-purple-500/50':
            hour % 6 === 3,
          'bg-yellow-500/50 after:content-[""] after:absolute after:left-0 after:top-0 after:w-1 after:h-full after:bg-yellow-500/50':
            hour % 6 === 4,
          'bg-orange-500/50': hour % 6 === 5,
        },
        {}
      )}
      {...rest}
    >
      <h6 className="text-sm font-bold">
        {event.service.name}
      </h6>
    </div>
  );
};
