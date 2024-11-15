import { ReactNode } from 'react';
import { cn } from '../lib/utils';

export type BadgeProps = {
  className?: string;
  children?: ReactNode;
  color?: 'yellow' | 'red' | 'green' | 'blue';
};

export const Badge = (props: BadgeProps) => {
  const { className, children, color = 'green' } = props;
  return (
    <div
      className={cn(
        className,
        'px-2 py-1 flex items-center justify-center  rounded-md',
        {
          'bg-red-600/20 text-red-800': color === 'red',
          'bg-green-600/20 text-green-800':
            color === 'green',
          'bg-blue-600/20 text-blue-800': color === 'blue',
          'bg-yellow-200 text-yellow-800':
            color === 'yellow',
        }
      )}
    >
      {children}
    </div>
  );
};
