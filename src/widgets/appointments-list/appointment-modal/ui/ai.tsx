import { Button } from '@/shared/ui/button';
import { AiHints } from '../domain';
import { HintGroup } from './hint-group';
import { Skeleton } from '@/shared/ui/skeleton';
import { SparklesIcon } from 'lucide-react';

type Props = {
  onGenerateHintsClick?: () => void;
  hints?: AiHints;
  isLoading?: boolean;
};

const SkeletonList = () => {
  return Array.from({ length: 3 }).map((_, index) => (
    <Skeleton key={index} className="h-6 w-full" />
  ));
};

export const AiSection = (props: Props) => {
  const { onGenerateHintsClick, hints, isLoading } = props;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-bold">AI советы</h2>
        <Button
          onClick={onGenerateHintsClick}
          disabled={isLoading}
          className="relative overflow-hidden text-white border-none rounded-lg shadow-lg"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 animate-gradient"></div>
          <div className="relative flex items-center gap-2 z-10">
            <SparklesIcon className="w-4 h-4" />
            {isLoading
              ? 'Генерация советов...'
              : 'Сгенерировать советы'}
          </div>
        </Button>
      </div>
      <div className="flex flex-col gap-4">
        {isLoading ? (
          <SkeletonList />
        ) : (
          hints &&
          Object.entries(hints).map(([key, value]) => (
            <HintGroup
              key={key}
              title={key}
              hints={value}
            />
          ))
        )}
      </div>
    </div>
  );
};
