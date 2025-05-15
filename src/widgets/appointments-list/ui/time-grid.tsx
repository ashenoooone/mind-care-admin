import { cn } from '@/shared/lib/utils';
import { Hours } from './hours';
import { TimeIndicator } from './time-line';
import { ComponentProps } from 'react';

type Props = {
  className?: string;
  mode?: 'week' | 'day';
  columns: React.ReactNode;
} & ComponentProps<'div'>;

export const TimeGrid = (props: Props) => {
  const {
    className,
    mode = 'week',
    columns,
    ...rest
  } = props;

  return (
    <div className="flex relative pl-10" {...rest}>
      <TimeIndicator />
      <Hours />
      <div
        className={cn(
          `w-full grid`,
          {
            'grid-cols-5': mode === 'week',
            'grid-cols-1': mode === 'day',
          },
          className
        )}
      >
        {columns}
      </div>
    </div>
  );
};
