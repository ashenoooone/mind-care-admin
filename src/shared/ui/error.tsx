import { cn } from '../lib/utils';
import { AlertTriangle } from 'lucide-react';

type ErrorProps = {
  className?: string;
  title?: string;
  description?: string;
  children?: React.ReactNode;
};

export const Error = ({
  className,
  title = 'Что-то пошло не так',
  description = 'Произошла ошибка при загрузке данных',
  children,
}: ErrorProps) => {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-4 p-6 text-center',
        className
      )}
    >
      <AlertTriangle className="h-12 w-12 text-red-500" />
      <div className="space-y-2">
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-sm text-gray-500">
          {description}
        </p>
      </div>
      {children}
    </div>
  );
};
