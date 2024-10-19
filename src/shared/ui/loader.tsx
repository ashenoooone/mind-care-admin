import { Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

interface LoaderProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
}

export default function Loader({
  size = 'medium',
  className,
}: LoaderProps) {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
  };

  return (
    <Loader2
      role="status"
      className={cn(
        'animate-spin',
        sizeClasses[size],
        className
      )}
    />
  );
}
