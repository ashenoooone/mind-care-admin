import { cn } from '@/shared/lib/utils';
import { ReactNode } from 'react';

type Props = {
  className?: string;
  items: ReactNode;
  title: ReactNode;
};

export const TableColumn = (props: Props) => {
  const { className, items, title } = props;
  return (
    <div
      className={cn(
        'flex flex-col gap-2 border-r last:border-r-0  flex-1 shrink-0',
        className
      )}
    >
      <div className="border-b text-center font-bold  py-2 px-10">
        {title}
      </div>
      <div className="flex flex-col gap-2 px-2">
        {items}
      </div>
    </div>
  );
};
