import { HintItem } from './hint-item';
import { cn } from '@/shared/lib/utils';
import { Skeleton } from '@/shared/ui/skeleton';

type Props = {
  title: string;
  hints?: {
    problem: string;
    context: string;
    confidence: number;
    level: number;
    recommendation: string;
  }[];
  className?: string;
  isLoading?: boolean;
};

export const HintGroup = ({
  title,
  hints,
  className,
  isLoading,
}: Props) => {
  if (isLoading) {
    return <Skeleton className="h-32" />;
  }

  if (!hints?.length) return null;

  return (
    <div>
      <h2 className="text-lg font-bold">{title}</h2>
      <div
        className={cn('grid grid-cols-2 gap-2', className)}
      >
        {hints.map((hint, index) => (
          <HintItem key={index} hint={hint} />
        ))}
      </div>
    </div>
  );
};
