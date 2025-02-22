import { cn } from '../lib/utils';

type ListProps = {
  className?: string;
  children: React.ReactNode;
  title?: React.ReactNode;
};

export const List = ({
  className,
  children,
  title,
}: ListProps) => {
  return (
    <ul className={cn('relative', className)}>
      {title && (
        <h3 className="text-lg font-bold">{title}</h3>
      )}
      <div className="relative ml-4 pl-6 before:absolute before:left-1 before:top-0 before:bottom-3 before:w-[2px] before:bg-black">
        {children}
      </div>
    </ul>
  );
};

export const ListItem = ({
  className,
  children,
}: ListProps) => {
  return (
    <div
      className={cn(
        'relative flex items-center gap-2 before:absolute before:left-[-20px] before:top-1/2 before:h-0.5 before:w-4 before:bg-black',
        className
      )}
    >
      {children}
    </div>
  );
};
