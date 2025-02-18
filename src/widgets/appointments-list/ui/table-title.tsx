import { cn } from '@/shared/lib/utils';

type Props = {
  className?: string;
  title: string;
  controls: React.ReactNode;
};

export const TableTitle = (props: Props) => {
  const { className, title, controls } = props;
  return (
    <div
      className={cn(
        'flex justify-between w-full items-center gap-2',
        className
      )}
    >
      <h2 className="text-2xl font-bold">{title}</h2>
      {controls}
    </div>
  );
};
