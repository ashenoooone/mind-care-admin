import { ReactNode } from 'react';
import { cn } from '../lib/utils';

type Props = {
  className?: string;
  children: ReactNode;
  variant?: 'green' | 'blue' | 'red';
};

export const Money = (props: Props) => {
  const { className, children, variant = 'green' } = props;
  return (
    <span
      className={cn(
        'font-bold text-green-700 bg-green-400/20 rounded-2xl px-1',
        {
          'text-red-700 bg-red-400/20': variant === 'red',
          'text-blue-700 bg-blue-400/20':
            variant === 'blue',
        },
        className
      )}
    >
      {children} ₽
    </span>
  );
};
