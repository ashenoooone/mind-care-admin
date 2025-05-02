import { cn } from '@/shared/lib/utils';
import { ReactNode } from 'react';

type Props = {
  className?: string;
  appointments: ReactNode;
};

export const List = (props: Props) => {
  const { className, appointments } = props;

  return (
    <div
      className={cn(className, 'grid grid-cols-4 gap-4')}
    >
      {appointments}
    </div>
  );
};
