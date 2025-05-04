import React from 'react';
import { cn } from '@/shared/lib/utils';
import { Card, CardContent } from '@/shared/ui/card';
import { Skeleton } from '@/shared/ui/skeleton';
import { AiHints } from '../domain';

type Props = {
  hint?: AiHints[string][number];
  className?: string;
  isLoading?: boolean;
};

export const HintItem = ({
  hint,
  className,
  isLoading,
}: Props) => {
  if (isLoading) {
    return (
      <Card
        className={cn(
          'border-l-4 border-l-gray-200',
          className
        )}
      >
        <CardContent className="p-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-full" />
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Skeleton className="w-2 h-2 rounded-full" />
                <Skeleton className="h-3 w-16" />
              </div>
              <Skeleton className="h-3 w-20" />
            </div>
            <div className="mt-2 p-2 bg-gray-50 rounded-md">
              <Skeleton className="h-3 w-full" />
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!hint) return null;

  return (
    <Card
      className={cn(
        'border-l-4 border-l-blue-500',
        className
      )}
    >
      <CardContent className="p-4">
        <div className="space-y-2">
          <h4 className="font-medium text-sm text-gray-900">
            {hint.problem}
          </h4>
          <p className="text-sm text-gray-600">
            {hint.context}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-xs text-gray-500">
                Уровень {hint.level}
              </span>
            </div>
            <div className="text-xs text-gray-500">
              Уверенность:{' '}
              {Math.round(hint.confidence * 100)}%
            </div>
          </div>
          <div
            className={`mt-2 p-2 bg-blue-50 rounded-md cursor-pointer transition-all text-sm text-blue-700 relative select-none`}
          >
            <div>{hint.recommendation}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
