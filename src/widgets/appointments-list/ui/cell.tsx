import { cn } from '@/shared/lib/utils';

export const Cell = (props: {
  children?: React.ReactNode;
  border?: boolean;
  className?: string;
}) => {
  const { children, border = true, className } = props;
  return (
    <div
      className={cn(
        `h-[60px] shrink-0 relative`,
        {
          'border-t last:border-b first:border-t-0': border,
        },
        className
      )}
    >
      {children}
    </div>
  );
};
