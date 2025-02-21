import { cn } from '@/shared/lib/utils';
import { Hours } from './hours';
import { TimeIndicator } from './time-line';

type Props = {
  className?: string;
  mode?: 'week' | 'day';
  columns: React.ReactNode;
};

export const TimeGrid = (props: Props) => {
  const { className, mode = 'week', columns } = props;

  return (
    <div className="flex relative pl-10">
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
